import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Threadlist = () => {
  let url = window.location.href;
  let id = url.substr(-1);

  const [categories, setCategories] = useState();
  const [threads, setThreads] = useState();
  const [isTrue, setIsTrue] = useState();
  const [user, setUser] = useState([]);
  const [threadCatId, setThreadCatId] = useState("");
  const [threadTitle, setThreadTitle] = useState("");
  const [threadDesc, setThreadDesc] = useState("");
  const [threadUserId, setThreadUserID] = useState("");
  const [threadUserName, setThreadUserName] = useState("");

  //login
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {
      const response = await fetch("api/User/profile", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setProfile(data);
        // console.log(data.username)
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  //   GetCategories
  useEffect(() => {
    (async () => await GetCategories(id))();
  }, []);
  async function GetCategories(sno) {
    const result = await axios.get("api/Category/ReadCategory/" + sno);
    setCategories(result.data);
  }

  const keys = Object.values(categories || {});

  //   GetThread

  async function GetThread(sno) {
    const result = await axios.get("api/Thread/ReadThread/Catid/" + sno);
    setThreads(result.data);
    setIsTrue(result.data.length > 0);
  }
  useEffect(() => {
    (() => GetThread(id))();
  }, []);

  //   Addthread
  async function AddThread(event) {
    event.preventDefault();

    try {
      if (threadTitle && threadDesc) {
        console.log(
          await axios.post("api/Thread/CreateRecord", {
            threadTitle: threadTitle,
            threadDesc: threadDesc,
            threadCatId: id,
            threadUserId: profile.id,
            threadUserName: profile.username,
          })
        );
        alert("Thread Added Successfully!");
        setThreadCatId("");
        setThreadTitle("");
        setThreadDesc("");
      } else {
        alert("Please Enter valid Details of Your Thread");
      }
      GetThread(id);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <div className="head">
        <Navbar />
        <div className="page-title">
          <div className="container">
            <h1 className="text-center">WELCOME TO {keys[1]} FORUM</h1>
            <p className="text-center">{keys[2]}</p>
          </div>
        </div>
      </div>

      <main className="main">
        <div className="container">
          <div className="main-inner">
            <div className="panel-layout">
              <div id="pg-1" className="panel-grid">
                <h1 className="py-2 text-center">
                  <b>Start a Discussion</b>
                </h1>
                {profile != null ? (
                  <div className="thread">

                  <form id="thread_form" className="text-light">
                    <div className="form-group">
                      <input
                        type="text"
                        hidden
                        className="form-control"
                        id="id"
                        value={threadCatId}
                        onChange={(event) => {
                          setThreadCatId(event.target.value);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <div className="input-group">
                        <input
                          tabIndex="101"
                          type="text"
                          value={threadTitle}
                          onChange={() => {
                            setThreadTitle(event.target.value);
                          }}
                          name="bbp_search"
                          className="form-control ui-autoComplete -input p-3"
                          placeholder="Problem Title"
                          autoComplete ="off"
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="input-group">
                        <input
                          tabIndex="101"
                          type="text"
                          value={threadDesc}
                          onChange={() => {
                            setThreadDesc(event.target.value);
                          }}
                          name="bbp_search"
                          className="form-control ui-autoComplete -input p-3"
                          placeholder="Problem Description"
                          autoComplete ="off"
                          />
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="form-group">
                        <input
                          type="text"
                          hidden
                          className="form-control"
                          id="id"
                          value={profile.id}
                          onChange={(event) => {
                            setThreadUserID(event.target.value);
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          hidden
                          className="form-control"
                          id="username"
                          value={profile.username}
                          onChange={(event) => {
                            setThreadUserName(event.target.value);
                          }}
                          />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={AddThread}
                      style={{
                        fontSize: 15,
                        color: "#ffffff",
                        backgroundColor: "#1d84b5",
                        borderColor: "#1d84b5",
                      }}
                    >
                      SUBMIT
                    </button>
                  </form>
                        </div>
                ) : (
                  <div
                    className={`p-5 mb-4 rounded-3`}
                    style={{
                      backgroundColor: "#202b42",
                      color: "white",
                    }}
                  >
                    <div className="container-fluid py-3">
                      <p className="col-md-10 fs-5">
                        You are not login.Login to be able to start a
                        Discussion!
                      </p>
                    </div>
                  </div>
                )}

                <h1
                  className="py-2 text-center"
                >
                  <b>Browse &lt; Questions</b>
                </h1>

                {isTrue == true ? (
                  threads?.map((item) => (
                    <>
                    <div className="d-flex align-items-center justify-content-center">

                    
                      <div className="card w-75 my-3" key={item.threadId}>
                        <div className="card-body">
                          <h5 className="card-title">
                            <Link
                              style={{
                                color: "#202b42",
                              }}
                              to={`/thread?threadid=${item.threadId}`}
                            >
                              {item.threadTitle}
                            </Link>
                          </h5>
                          <p className="card-text">{item.threadDesc} <br />
                          Asked By: <b>{item.threadUserName}</b>
                          </p>
                          <Link
                            className="btn btn-primary mt-2"
                            style={{
                              fontSize: 15,
                              color: "#ffffff",
                              backgroundColor: "#1d84b5",
                              borderColor: "#1d84b5",
                            }}
                            to={`/thread?threadid=${item.threadId}`}
                          >
                            View Comment
                          </Link>
                        </div>
                      </div>
                      </div>
                    </>
                  ))
                ) : (
                  <div
                    className={`p-5 mb-4  rounded-3`}
                    style={{
                      backgroundColor: "#202b42",
                      color: "white",
                    }}
                  >
                    <div className="container-fluid py-3">
                      <p className="display-5 ">No Threads Found</p>
                      <p className="col-md-10 fs-5">
                        Be the first person to ask a question
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

    </>
  );
};

export default Threadlist;
