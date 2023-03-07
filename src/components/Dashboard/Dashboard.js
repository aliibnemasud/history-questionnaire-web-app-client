import React, { useEffect, useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import AllSubmittedAnswers from "./AllSubmittedAnswers";
import Loading from "../Shared/Loading";
import MySubmittedQuestions from "./MySubmittedQuestions";
import Users from "./Users";
import axios from "axios";


const Dashboard = () => {
  const [signOut, loading, error] = useSignOut(auth);
  const [authUser, authLoading, autherror] = useAuthState(auth);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [validator, setValidator] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`https://questionary-website.onrender.com/user/validator?email=${authUser?.email}`, {
        headers: {
          Authorization: `Barer ${token}`,
        },
      })
      .then((res) => {
        setValidator(res?.data?.validator);
      });
  }, [authUser]);



  if (loading || authLoading || fetchLoading) {
    return <Loading />;
  }

  if (!authUser?.uid) {
    navigate("/");
  }

  return (
    <div className="container-fluid p-0 overflow-hidden">

      <header className="fixed-top">
        <div className="d-flex align-items-center justify-content-between bg-white shadow-sm p-3">
          <h2>Welcome <span className="text-success">{authUser?.displayName}</span></h2>


          <div className="">
            <button className="btn btn-primary" onClick={() => navigate("/questions")}>
              Start Test
            </button>
          </div>

          <button
            onClick={() => {
              signOut();
              localStorage.removeItem("accessToken");
            }}
            className="btn btn-danger"
          >
            Sign Out
          </button>

          

        </div>


      </header>
            <br />
            <br />
            <br />
            {/* <br /> */}

      <div className="row">
        <div className="col-md-2">
          <div className="sidebar">
            <div class="nav nabs__tabs-custom flex-column nav-pills me-4" id="v-pills-tab" role="tablist" aria-orientation="vertical">

              <div class="reservation__tabs active" id="v-pills-customer-tab" data-bs-toggle="pill" data-bs-target="#v-pills-customer" type="button" role="tab" aria-controls="v-pills-customer" aria-selected="true">
                User Profile
              </div>

              {validator && (
                <div class="reservation__tabs tabs-gap" id="v-pills-details-tab" data-bs-toggle="pill" data-bs-target="#v-pills-details" type="button" role="tab" aria-controls="v-pills-details" aria-selected="true">
                  Submitted Answer
                </div>
              )}

              <div class="reservation__tabs tabs-gap" id="v-pills-rates-tab" data-bs-toggle="pill" data-bs-target="#v-pills-rates" type="button" role="tab" aria-controls="v-pills-rates" aria-selected="true">
                My Submitted Questions
              </div>

              {validator && (
                <div class="reservation__tabs tabs-gap" id="v-pills-damages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-damages" type="button" role="tab" aria-controls="v-pills-damages" aria-selected="true">
                  Users
                </div>
              )}



            </div>
          </div>
        </div>

        <div className="col-md-10">
          <div class="tab-content" id="v-pills-tabContent">
            {/* tab 1 */}
            <div class="tab-pane fade show active" id="v-pills-customer" role="tabpanel" aria-labelledby="v-pills-customer-tab" tabindex="0">
              <div className=" p-5">
                <h5 className="text-danger">No Data Found !!</h5>
              </div>

            </div>

            {/* tab 2  */}
            <div class="tab-pane fade mt-3" id="v-pills-details" role="tabpanel" aria-labelledby="v-pills-details-tab" tabindex="0">
              <AllSubmittedAnswers />
            </div>

            {/* tab 3 */}
            <div class="tab-pane fade mt-3" id="v-pills-rates" role="tabpanel" aria-labelledby="v-pills-rates-tab" tabindex="0">
              <MySubmittedQuestions />
            </div>

            {/* tab 4 */}
            <div class="tab-pane fade mt-3" id="v-pills-damages" role="tabpanel" aria-labelledby="v-pills-damages-tab" tabindex="0">
              <Users />
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default Dashboard;
