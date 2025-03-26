import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [threads, setThreads] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        (async () => await GetCategories())();
    }, []);

    async function GetCategories() {
        const result = await axios.get("api/Category/ReadCategory");
        setCategories(result.data);
    }

    async function GetThread() {
        const result = await axios.get("api/Thread/GetThread");
        setThreads(result.data);
    }
    useEffect(() => {
        (() => GetThread())();
    }, []);

    useEffect(() => {
        (async () => await GetComment())();
    }, []);
    async function GetComment() {
        const result = await axios.get("api/Comment/GetComment");
        setComments(result.data);
    }
    const [query, setQuery] = useState("");
    let navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query) {
            navigate(`/search?query=${query}`);
        }
    };

    const tooltipTriggerList = document.querySelectorAll(
        '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map(
        (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );

    return (
        <>
            {/* Slier */}
            <div className="head">
                <Navbar />
                <div className="page-title">
                    <div className="container">
                        <h1 className="text-center">WELCOME TO iDISCUSS - CODING FORUM</h1>
                        <p className="text-center">
                            The most popular coding forum on the internet!
                        </p>
                        <div className="header-search">
                            <form action="get" onSubmit={handleSearch}>
                                <div className="input-group">
                                    <input
                                        tabIndex="101"
                                        type="text"
                                        value={query}
                                        onChange={() => {
                                            setQuery(event.target.value);
                                        }}
                                        name="bbp_search"
                                        className="form-control ui-autoComplete -input"
                                        placeholder="Search"
                                        autoComplete="off"
                                    />
                                    <div className="input-group-append">
                                        <button type="submit" className="btn btn-info p-4">
                                            <i className="ri-search-2-line"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <main className="main">
                <div className="container">
                    <div className="main-inner">
                        <div className="panel-layout">
                            <div id="pg-1" className="panel-grid">
                                <div className="panel-row-style disputo-stretched">
                                    <div
                                        className="simpleParallax"
                                        style={{ overflow: "hidden" }}
                                    >
                                        <img
                                            src="https://themes.thememasters.club/disputo/wp-content/uploads/sites/14/2020/08/homepage-bg-1536x876.jpg"
                                            alt=""
                                            width={"1116"}
                                            height={"650"}
                                            data-siteorigin-parallax="true"
                                        />
                                    </div>
                                    <div className="panel-grid-cell" id="pgc-1-1">
                                        <div className="panel-cell-style">
                                            <h1 className="text-light">JOIN OUR FORUM</h1>
                                            <p>
                                                <span className="lead text-primary fw-bold">
                                                    Talk about anything that's on your mind and see what
                                                    others think. As a guest to our forum you are only
                                                    able to view posts. When you register with forum you
                                                    can join in with topics, start new topics and
                                                    generally be a part of the first level of our
                                                    community.
                                                </span>
                                            </p>
                                            <div className="ow-button mt-4">
                                                <Link to={"/signup"} className="ow-button-hover">
                                                    <span>REGISTER NOW !</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginLeft: "30px" }}>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-md-4">
                                        <div className="card" style={{ width: "18rem" }}>
                                            <div
                                                className="d-flex"
                                                style={{
                                                    marginTop: -20,
                                                }}
                                            >
                                                <i
                                                    className="ri-signpost-fill"
                                                    style={{ fontSize: 50, color: "#202b42" }}
                                                ></i>
                                                <div
                                                    style={{
                                                        marginTop: 27,
                                                        textOverflow: "ellipsis",
                                                        overflow: "hidden",
                                                        opacity: 0.5,
                                                        fontSize: "150%",
                                                        fontWeight: 700,
                                                        paddingLeft: "129px",
                                                        textAlign: "right",
                                                        lineHeight: 1.1,
                                                    }}
                                                >
                                                    POSTS
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    maxWidth: "100%",
                                                    display: "table-cell",
                                                    verticalAlign: "middle",
                                                    fontSize: "35px",
                                                    fontWeight: 700,
                                                    paddingLeft: "15px",
                                                    textAlign: "right",
                                                    lineHeight: 1.1,
                                                    marginTop: -30,
                                                }}
                                            >
                                                {threads.length}
                                            </div>
                                            {/* </div> */}
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card" style={{ width: "18rem" }}>
                                            <div
                                                className="d-flex"
                                                style={{
                                                    marginTop: -20,
                                                }}
                                            >
                                                <i
                                                    className="ri-chat-thread-fill"
                                                    style={{ fontSize: 50, color: "#1d84b5" }}
                                                ></i>
                                                <div
                                                    style={{
                                                        marginTop: 27,
                                                        textOverflow: "ellipsis",
                                                        overflow: "hidden",
                                                        opacity: 0.5,
                                                        fontSize: "150%",
                                                        fontWeight: 700,
                                                        paddingLeft: "119px",
                                                        textAlign: "right",
                                                        lineHeight: 1.1,
                                                    }}
                                                >
                                                    TOPICS
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    maxWidth: "100%",
                                                    display: "table-cell",
                                                    verticalAlign: "middle",
                                                    fontSize: "35px",
                                                    fontWeight: 700,
                                                    paddingLeft: "15px",
                                                    textAlign: "right",
                                                    lineHeight: 1.1,
                                                    marginTop: -30,
                                                }}
                                            >
                                                {categories.length}
                                            </div>
                                            {/* </div> */}
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card" style={{ width: "18rem" }}>
                                            <div
                                                className="d-flex"
                                                style={{
                                                    marginTop: -20,
                                                }}
                                            >
                                                <i
                                                    className="ri-reply-all-fill"
                                                    style={{ fontSize: 50, color: "red", opacity: 0.7 }}
                                                ></i>
                                                <div
                                                    style={{
                                                        marginTop: 27,
                                                        textOverflow: "ellipsis",
                                                        overflow: "hidden",
                                                        opacity: 0.5,
                                                        fontSize: "150%",
                                                        fontWeight: 700,
                                                        paddingLeft: "112px",
                                                        textAlign: "right",
                                                        lineHeight: 1.1,
                                                    }}
                                                >
                                                    REPLIES
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    maxWidth: "100%",
                                                    display: "table-cell",
                                                    verticalAlign: "middle",
                                                    fontSize: "35px",
                                                    fontWeight: 700,
                                                    paddingLeft: "15px",
                                                    textAlign: "right",
                                                    lineHeight: 1.1,
                                                    marginTop: -30,
                                                }}
                                            >
                                                {comments.length}
                                            </div>
                                            {/* </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row my-4">
                                {categories?.map((item) => (
                                    <div className="col-md-6 my-2 " key={item.categoryId}>
                                        <div className="card">
                                            <h5 className="card-header">Topic</h5>
                                            <div className="card-body">
                                                <h5 className="card-title">{item.categoryName}</h5>
                                                <p className="card-text">
                                                    {item.categoryDescription.substr(0, 100)}...
                                                </p>
                                                <Link
                                                    to={`/threadlist?catid=${item.categoryId}`}
                                                    type="button"
                                                    className={`btn btn-primary mt-3`}
                                                    style={{
                                                        fontSize: 15,
                                                        color: "#ffffff",
                                                        backgroundColor: "#1d84b5",
                                                        borderColor: "#1d84b5",
                                                    }}
                                                >
                                                    View Thread
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Home;
