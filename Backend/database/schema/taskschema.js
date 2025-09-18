const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    task: { type: String, required: true },
    status: { 
        type: String, 
        enum: ["pending", "completed", "cancelled"], 
        default: "pending" 
    }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
