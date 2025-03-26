import { Link } from "react-router-dom";
import { useEffect } from "react";
const Foot
    = (props) => {
        return (
            <>
                <div className="head footer">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-12 col-lg-7" style={{ color: "#bdc3c7", fontSize: 20 }}>
                                Copyright <span>©</span> iDiscuss Coding Forum 2024 | All right
                                reserved
                            </div>
                            <div className="col-12 col-lg-5">
                                <ul className="social-icons">
                                    <li
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title=""
                                        data-original-title="Facebook"
                                    >
                                        <Link href="#">
                                            <i className="ri-facebook-circle-line"></i>
                                        </Link>
                                    </li>
                                    <li
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title=""
                                        data-original-title="Twitter"
                                    >
                                        <Link href="#">
                                            <i className="ri-twitter-x-fill"></i>
                                        </Link>
                                    </li>
                                    <li
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title=""
                                        data-original-title="Instagram"
                                    >
                                        <Link href="#">
                                            <i className="ri-instagram-line"></i>
                                        </Link>
                                    </li>
                                    <li
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title=""
                                        data-original-title="Go to Top"
                                    >
                                        <button id="disputo-go-to-top" className="border-0" style={{ backgroundColor: "transparent", color: "#BDC3C7" }} onClick={() => {

                                            window.scrollTo(0, 0);
                                        }
                                        }>
                                            <i className="ri-arrow-up-circle-line"></i>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <p className="text-center mb-0"></p>
                    </div>
                </div>
            </>
        );
    };

export default Foot;
