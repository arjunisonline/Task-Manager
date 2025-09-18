import { useEffect, useState } from "react";
import Navbar from "./Reusables/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        axios
            .get("http://localhost:3000/api/tasklist", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setTasks(res.data))
            .catch((err) => console.error(err));
    }, [navigate]);

    const handleTask = () => {
        const token = localStorage.getItem("token");
        if (task.trim() === "") {
            toast.error("Enter Task", { position: "bottom-right" });
            return;
        }

        axios
            .post(
                "http://localhost:3000/api/addtask",
                { task, status: "pending" },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((res) => {
                setTasks([...tasks, res.data]);
                toast.success("Task Added", { position: "bottom-right" });
                setTask("");
            })
            .catch((err) => console.error(err));
    };

    const handleStatusChange = (id, newStatus) => {
        const token = localStorage.getItem("token");
        axios
            .put(
                `http://localhost:3000/api/tasks/${id}`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then(() => {
                setTasks(
                    tasks.map((t) =>
                        t._id === id ? { ...t, status: newStatus } : t
                    )
                );
            })
            .catch((err) => console.error(err));
    };

    return (
        <>
            <div
                style={{
                    minHeight: "100vh",
                    background: "linear-gradient(135deg, #9face6 0%, #b3b3b3 100%)",
                    color: "#000",
                }}
            >
                <Navbar />

                <div className="container py-4">
                    <ToastContainer />

                    {/* Input Section */}
                    <div className="row mt-3">
                        <div className="col input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Write Task"
                                value={task}
                                onChange={(e) => setTask(e.target.value)}
                            />
                            <button
                                className="btn btn-outline-primary"
                                onClick={handleTask}
                            >
                                Add Task
                            </button>
                        </div>
                    </div>

                    {/* Task List */}
                    <div className="row mt-4">
                        <div className="col">
                            <div className="card shadow-sm rounded-3">
                                <div className="card-body">
                                    {tasks.length === 0 ? (
                                        <p className="text-center text-muted">
                                            No tasks yet. Add one above 🚀
                                        </p>
                                    ) : (
                                        <table className="table table-bordered table-striped mb-0">
                                            <thead>
                                                <tr className="text-center">
                                                    <th style={{ width: "70%" }}>
                                                        Task
                                                    </th>
                                                    <th style={{ width: "30%" }}>
                                                        Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tasks.map((t) => (
                                                    <tr
                                                        key={t._id}
                                                        className="text-center"
                                                    >
                                                        <td>{t.task}</td>
                                                        <td>
                                                            <select
                                                                className="form-select text-center"
                                                                value={t.status}
                                                                onChange={(e) =>
                                                                    handleStatusChange(
                                                                        t._id,
                                                                        e.target.value
                                                                    )
                                                                }
                                                            >
                                                                <option value="pending">
                                                                    Pending
                                                                </option>
                                                                <option value="completed">
                                                                    Completed
                                                                </option>
                                                                <option value="cancelled">
                                                                    Cancelled
                                                                </option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Homepage;