var express = require('express');
var User = require('../database/schema/userschema');
var Task = require('../database/schema/taskschema');
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const VerifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId; // this matches `user` field in Task
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};


router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const Findemail = await User.findOne({ email });

        if (Findemail) {
            return res.status(400).json({message:"Email Already Exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered Successfully' });

    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).send('Could not Signup');
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({ message: "Email doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid Password' });
        }

        const token = jwt.sign(
            { userId: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: 'Login successful', token });

    } catch (err) {
        console.error(err);
        res.status(500).send('Could not login');
    }
});

router.get("/tasklist", VerifyToken, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        console.error("Error fetching tasks:", err);
        res.status(500).json({ error: "Could not fetch tasks" });
    }
});

router.post("/addtask", VerifyToken, async (req, res) => {
    const { task } = req.body;

    if (!task || task.trim() === "") {
        return res.status(400).json({ message: "Task cannot be empty" });
    }

    try {
        const newTask = new Task({
            user: req.user,
            task,
            status: "pending"
        });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        console.error("Error adding task:", err);
        res.status(500).json({ error: "Could not add task" });
    }
});

router.put("/tasks/:id", VerifyToken, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "completed", "cancelled"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
    }

    try {
        const updatedTask = await Task.findOneAndUpdate(
            { _id: id, user: req.user }, 
            { status },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(updatedTask);
    } catch (err) {
        console.error("Error updating task:", err);
        res.status(500).json({ error: "Could not update task" });
    }
});


module.exports = router;
