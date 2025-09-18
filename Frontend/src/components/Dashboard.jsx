import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Reusables/Navbar";

const Dashboard = () => {
    const API_BASE = process.env.REACT_APP_API_BASE;
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        axios
            .get(`${API_BASE}/api/tasklist`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setTasks(res.data))
            .catch((err) => {
                console.error(err);
                toast.error("Error loading tasks", { position: "bottom-right" });
            });
    }, [navigate]);

    // Count tasks by status
    const stats = {
        total: tasks.length,
        pending: tasks.filter((t) => t.status === "pending").length,
        completed: tasks.filter((t) => t.status === "completed").length,
        cancelled: tasks.filter((t) => t.status === "cancelled").length,
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #9face6 0%, #b3b3b3 100%)",
                color: "#000",
            }}
        >
            <Navbar />
            <ToastContainer />

            <div className="container py-5">
                <h2 className="mb-4 text-center">Task Dashboard</h2>

                {/* Stats Cards */}
                <div className="row text-center mb-4">
                    <div className="col-md-3 col-6 mb-3">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5>Total Tasks</h5>
                                <h3>{stats.total}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-6 mb-3">
                        <div className="card shadow-sm">
                            <div className="card-body text-warning">
                                <h5>Pending</h5>
                                <h3>{stats.pending}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-6 mb-3">
                        <div className="card shadow-sm">
                            <div className="card-body text-success">
                                <h5>Completed</h5>
                                <h3>{stats.completed}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-6 mb-3">
                        <div className="card shadow-sm">
                            <div className="card-body text-danger">
                                <h5>Cancelled</h5>
                                <h3>{stats.cancelled}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                </div>
            </div>
    );
};

export default Dashboard;
