import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Search = () => {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery().get("query");
  const [results, setResults] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [que, setQue] = useState("");
  let navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      navigate(`/search?query=${que}`);
    }
  };

  useEffect(() => {
    if (query) {
      axios
        .get(`/api/Thread?query=${query}`)
        .then((response) => {
          setResults(response.data);
          setNoResult(response.data.length === 0);
        })
        .catch((error) => {
          setNoResult(true);
          console.error(
            "There was an error fetching the search results!",
            error
          );
        });
    }
  }, [query]);

  return (
    <>
      <div className="head">
        <Navbar />
        <div className="page-title">
          <div className="container">
            <h1 className="text-center">Search results for '{query}'</h1>
            <div className="header-search">
              <form action="get" onSubmit={handleSearch}>
                <div className="input-group">
                  <input
                    tabIndex="101"
                    type="text"
                    value={que}
                    onChange={() => {
                      setQue(event.target.value);
                    }}
                    name="bbp_search"
                    className="form-control ui-autoComplete -input"
                    placeholder="Search"
                    autoComplete ="off"
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
        <main className="container">
          <div className="main-inner">
            <div
              className="panel-layout"
              style={{
                boxShadow:
                  " 0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .24)",
              }}
            >
              <div id="pg-1" className="panel-grid">
                {noResult ? (
                  <div
                    className={`p-5 my-2 rounded-3`}
                    style={{
                      backgroundColor: "#202b42",
                      color: "white",
                    }}
                  >
                    <h1 className="py-2 text-light">No results Found</h1>
                    <div className="container-fluid py-3">
                      <p className="col-md-10 fs-5">Suggestions:</p>
                      <ul>
                        <li>Make sure that all words are spelled correctly.</li>
                        <li>Try different keywords.</li>
                        <li>Try more general keywords.</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  results?.map((item) => (
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
                            <p className="card-text">{item.threadDesc}</p>
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
                              View Thread
                            </Link>
                          </div>
                        </div>
                      </div>
                    </>
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      </main>
    </>
  );
};

export default Search;
