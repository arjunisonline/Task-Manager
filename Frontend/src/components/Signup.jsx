import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Signuppage = () => {
    const API_BASE = process.env.REACT_APP_API_BASE;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmpassword) {
          toast.error("Passwords don't match");
            return;
        }

        try {
            const user = { name, email, password };

            await axios.post(`${API_BASE}/api/tasklist`, user); //save the user data

            toast.success('Signup Sucess')

            // Clear form
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            // Redirect to login page
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            toast.error(err.response?.data?.message);
        }
    };

    return (
         <div className="position-relative vh-100" style={{background: "linear-gradient(135deg, #9face6 0%, #b3b3b3 100%)",}}>
            <div className="container d-flex justify-content-center align-items-center h-100">
              <ToastContainer/>
                <form 
                    className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-6 p-4 rounded shadow bg-white bg-opacity-75" 
                    method="POST" 
                    onSubmit={handleSignup}
                >
                    <h3 className="text-center text-info-emphasis mb-4">Signup</h3>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                            name="name" 
                            required
                        />
                    </div>

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

                    <div className="mb-4">
                        <label className="form-label fw-semibold">Confirm Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            value={confirmpassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            name="confirmpassword" 
                            required
                        />
                    </div>

                    <div className="text-center d-flex flex-column align-items-center">
                        <input type="submit" value="Signup" className="btn btn-primary w-75 mb-2" />
                        <small className="form-text">
                            Have an account? <Link to="/login">Login</Link>
                        </small>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signuppage;
