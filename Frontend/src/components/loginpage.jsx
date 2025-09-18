import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Loginpage = () => {
    const API_BASE = process.env.REACT_APP_API_BASE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const user = { email, password };

            const res = await axios.post(`${API_BASE}/api/tasklist`, user); //check the email and pass

            localStorage.setItem("token", res.data.token);

            // Clear form
            setEmail("");
            setPassword("");
            toast.success('Login Sucessful',{position:"top-right"});

            // Redirect to homepage after short delay
            setTimeout(() => navigate("/"), 1500);
        } catch (err) {
            toast.error(err.response?.data?.message,{position:"top-right"});
        }
    };

    return (
        <div className="position-relative vh-100" style={{background: "linear-gradient(135deg, #9face6 0%, #b3b3b3 100%)",}}>
            <div className="container d-flex justify-content-center align-items-center h-100" >
                <ToastContainer/>
                <form 
                    className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-6 p-4 rounded shadow bg-white bg-opacity-75" 
                    method="POST" 
                    onSubmit={handleLogin}
                >
                    <h3 className="text-center text-info-emphasis mb-4">Login</h3>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            name="email" 
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-semibold">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            name="password" 
                            required
                        />
                    </div>

                    <div className="text-center d-flex flex-column align-items-center">
                        <input type="submit" value="Login" className="btn btn-primary w-75 mb-2" />
                        <small className="form-text">
                            Don’t have an account? <Link to="/signup">Signup</Link>
                        </small>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Loginpage;
