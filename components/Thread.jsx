import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
const Thread = () => {
  let url = window.location.href;
  let id = url.substr(-1);

  const [commentContent, setCommentContent] = useState("");
  const [threadId, setthreadId] = useState("");
  const [threads, setThreads] = useState();
  const [comments, setComments] = useState();
  const [isTrue, setIsTrue] = useState();
  const [commentBy, setCommentBy] = useState("");

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
        console.log(data);
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

  // Get Thread
  useEffect(() => {
    (async () => await GetThread(id))();
  }, []);

  async function GetThread(sno) {
    const result = await axios.get("api/Thread/ReadThread/" + sno);
    setThreads(result.data);
  }

  const threadvalue = Object.values(threads || {});

  //   Get Comment
  useEffect(() => {
    (async () => await GetComment(id))();
  }, []);
  async function GetComment(sno) {
    const result = await axios.get("api/Comment/ReadComment/" + sno);
    setComments(result.data);
    setIsTrue(result.data.length > 0);
  }

  //   Add Comment
  async function AddComment(event) {
    event.preventDefault();
    try {
      if (commentContent) {
        await axios.post("api/Comment/CreateComment", {
          commentContent: commentContent,
          threadId: id,
          commentBy: profile.username,
        });

        alert("Comment Added Successfully!");
        setCommentContent("");
        setthreadId("");
      } else {
        alert("Comment Content is Required");
      }
      GetComment(id);
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
            <h1 className="text-center">{threadvalue[1]}</h1>
            <p className="text-center">{threadvalue[2]}</p>
          </div>
        </div>
      </div>

      <main className="main">
        <div className="container">
          <div className="main-inner">
            <div className="panel-layout">
              <div id="pg-1" className="panel-grid">
                <h1 className="py-2 text-center">
                  <b>Type a Comment</b>
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
                          value={threadId}
                          onChange={(event) => {
                            setThreadCatId(event.target.value);
                          }}
                        />
                        <input
                          type="text"
                          hidden
                          className="form-control"
                          id="commentBy"
                          value={profile.username}
                          onChange={(event) => {
                            setCommentBy(event.target.value);
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <div className="input-group">
                          <input
                            tabIndex="101"
                            type="text"
                            value={commentContent}
                            onChange={() => {
                              setCommentContent(event.target.value);
                            }}
                            name="bbp_search"
                            className="form-control ui-autoComplete  -input p-3"
                            placeholder="Type a Comment"
                            autoComplete  ="off"
                          />
                        </div>
                      </div>
                      
                      <button
                        type="submit"
                        className="btn btn-success"
                        onClick={AddComment}
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

                <h1 className="py-2 text-center">
                  <b>Discussions</b>
                </h1>

                {isTrue == true ? (
                  comments?.map((item) => (
                    <>
                    <div className="d-flex align-items-center justify-content-center">

                    
                      <div className="card w-75 my-3" key={item.commentId}>
                        <div className="card-body">
                          <h5 className="card-title">{item.commentContent}</h5>
                          <p className="card-text"> Posted By: <b>{item.commentBy}</b> </p>
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
                      <p className="display-5 ">No Comments Found</p>
                      <p className="col-md-10 fs-5">
                        Be the first person to type a Comment
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

export default Thread;
