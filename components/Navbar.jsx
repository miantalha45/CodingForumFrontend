import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../src/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
const Navbar = () => {
    const { profile, logout } = useContext(AuthContext);

    const [categorie, setCategorie] = useState([]);
    useEffect(() => {
        (async () => await ReadCategories())();
    }, []);

    async function ReadCategories() {
        const result = await axios.get("api/Category/Read");
        setCategorie(result.data);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <nav
                id="menu-wrapper"
                className={`navbar navbar-expand-lg bg-transparent navbar-light m-0 p-0`}
            >
                <div className="container">
                    <a
                        className="navbar-brand fw-bolder"
                        style={{
                            color: "#ffffff",
                            fontSize: 44,
                            // fontWeight: 1000,
                        }}
                        href="/"
                    >
                        IDISCUSS
                    </a>
                    <button
                        className="navbar-toggler "
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item mx-2">
                                <Link
                                    className="nav-link"
                                    style={{
                                        color: "#ffffff",
                                        fontSize: 17,
                                        fontWeight: 600,
                                    }}
                                    aria-current="page"
                                    to="/"
                                >
                                    HOME
                                </Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link
                                    className="nav-link"
                                    to="#"
                                    style={{
                                        color: "#ffffff",
                                        fontSize: 17,
                                        fontWeight: 600,
                                    }}
                                >
                                    ABOUT
                                </Link>
                            </li>
                            <li className="nav-item dropdown mx-2">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    style={{
                                        color: "#ffffff",
                                        fontSize: 17,
                                        fontWeight: 600,
                                    }}
                                    to="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    TOP CATEGORIES
                                </Link>
                                <ul className="dropdown-menu">
                                    {categorie?.map((item) => (
                                        <li key={item.categoryId}>
                                            <Link
                                                className="dropdown-item"
                                                to={`/threadlist?catid=${item.categoryId}`}
                                            >
                                                {item.categoryName}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="nav-item mx-2">
                                <Link
                                    className="nav-link"
                                    style={{
                                        color: "#ffffff",
                                        fontSize: 17,
                                        fontWeight: 600,
                                    }}
                                    to="#"
                                >
                                    CONTACT
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {profile ? (
                        <>
                            <div
                                className={`text my-0 fw-bold pe-2`}
                                style={{
                                    color: "#ffffff",
                                    fontSize: 17,
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                }}
                            >
                                Welcome {profile.username}
                            </div>
                            <Link
                                to={"/logout"}
                                type="button"
                                className={`btn btn-primary mx-2`}
                                style={{ fontSize: 18 }}
                            >
                                LOGOUT
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to={"/login"}
                                type="button"
                                className={`btn btn-primary mx-2`}
                                style={{ fontSize: 18 }}
                            >
                                LOGIN
                            </Link>
                            <Link
                                to={"/signup"}
                                type="button"
                                className={`btn btn-primary signup-button mx-2`}
                                style={{ fontSize: 18 }}
                            >
                                SIGNUP
                            </Link>
                        </>
                    )}
                </div>
            </nav>
            <hr className="text-light" />
        </>
    );
};

export default Navbar;
