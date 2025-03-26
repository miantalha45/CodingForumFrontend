import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
const Signup = () => {
  const [users, setUsers] = useState();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function Signup(e) {
    e.preventDefault();
    if (userEmail != "") {
      if (/\S+@\S+\.\S+/.test(userEmail)) {
        const result = await axios.get(`api/User/ReadUser/email/${userEmail}`);
        setUsers(result.data);
        if (result.data.length > 0) {
          alert("Email already exists");
        } else {
          try {
            // if ( == true) {
            // alert("Please Enter valid Email");
            if (userPassword.length < 6) {
              alert("Password must be of 6 Characters");
            } else if (userPassword != confirmPassword) {
              alert("Passwords don't match");
            } else if (!userName) {
              alert("Please enter UserName");
            } else {
              await axios.post("api/User/Signup", {
                userName: userName,
                userEmail: userEmail,
                userPassword: userPassword,
              });
              alert("You have Signed Up Successfully!You can Login now");
              navigate("/login");
              setUserName("");
              setUserEmail("");
              setUserPassword("");
              setConfirmPassword("");
            }
          } catch (error) {
            alert(error);
          }
        }
      } else {
        alert("Please Enter valid Email");
      }
    } else {
      alert("Please Enter Valid Information");
    }
  }

  return (
    <>
      <div className="head">
        <header className="pt-3">
          <Navbar />
        </header>
        <div className="page-title" style={{ padding: 140 }}>
          <div className="container">
            <h1 className="text-center">SIGNUP TO IDISCUSS</h1>
            <p className="text-center">
              Already have an account?
              <Link to={"/login"} className="text-success">
                Login
              </Link>
            </p>
            <div className="header-search">
              <form action="get">
                <div className="input-group">
                  <input
                    tabindex="101"
                    type="text"
                    value={userName}
                    onChange={(event) => {
                      setUserName(event.target.value);
                    }}
                    name="bbp_search"
                    class="form-control ui-autocomplete-input"
                    placeholder="Enter your name"
                    autocomplete="off"
                  />
                </div>
                <div className="input-group my-4">
                  <input
                    tabindex="101"
                    type="text"
                    value={userEmail}
                    onChange={(event) => setUserEmail(event.target.value)}
                    name="bbp_search"
                    class="form-control ui-autocomplete-input"
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
                <div className="input-group my-4">
                  <input
                    type="password"
                    tabindex="101"
                    value={confirmPassword}
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                    }}
                    name="bbp_search"
                    class="form-control ui-autocomplete-input"
                    placeholder="Confirm password"
                    autocomplete="off"
                  />
                </div>
                <button
                  type="submit"
                  className={`btn btn-primary mx-2`}
                  style={{ fontSize: 18 }}
                  onClick={Signup}
                >
                  SIGNUP
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
