import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../src/AuthContext";
import Navbar from "./Navbar";

const Login = () => {
    const navigate = useNavigate();
    const { setProfile, fetchProfile } = useContext(AuthContext);
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        if (userEmail !== "") {
            try {
                const result = await axios.get(`api/User/ReadUser/email/${userEmail}`);
                if (result.data.length > 0) {
                    const user = result.data[0];
                    if (userPassword === user.userPassword) {
                        const response = await fetch("api/User/login", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            credentials: "include",
                            body: JSON.stringify({
                                userName: user.userName,
                                userPassword,
                                userEmail,
                            }),
                        });
                        const data = await response.json();
                        if (response.ok) {
                            alert("You have Logged In successfully!");
                            fetchProfile();
                            navigate("/");
                            setUserEmail("");
                            setUserPassword("");
                        } else {
                            alert(data.message || "Login failed");
                        }
                    } else {
                        alert("Wrong Password");
                    }
                } else {
                    alert("Email doesn't exist");
                }
            } catch (error) {
                console.error("Login error:", error);
                alert("An error occurred during login");
            }
        } else {
            alert("Please Enter Valid Credentials");
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="head">
                <header className="pt-3">
                    <Navbar />
                </header>
                <div className="page-title" style={{ padding: 140 }}>
                    <div className="container">
                        <h1 className="text-center">LOGIN TO IDISCUSS</h1>
                        <p className="text-center">
                            Don't have an account?
                            <Link to={"/signup"} className="text-success">
                                Signup
                            </Link>
                        </p>
                        <div className="header-search">
                            <form action="get" onSubmit={handleLogin}>
                                <div className="input-group">
                                    <input
                                        tabIndex="101"
                                        type="text"
                                        value={userEmail}
                                        onChange={(event) => setUserEmail(event.target.value)}
                                        name="bbp_search"
                                        className="form-control ui-autocomplete-input"
                                        placeholder="Enter your email"
                                        autocomplete="off"
                                    />
                                </div>
                                <div className="input-group my-4">
                                    <input
                                        type="password"
                                        tabindex="101"
                                        value={userPassword}
                                        onChange={(event) => setUserPassword(event.target.value)}
                                        name="bbp_search"
                                        class="form-control ui-autocomplete-input"
                                        placeholder="Enter your password"
                                        autocomplete="off"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className={`btn btn-primary mx-2`}
                                    style={{ fontSize: 18 }}
                                >
                                    LOGIN
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
