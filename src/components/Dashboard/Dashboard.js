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
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/validator?email=${authUser?.email}`, {
        headers: {
          Authorization: `Barer ${token}`,
        },
      })
      .then((res) => {
        setValidator(res?.data?.validator);
        setFetchLoading(false);
      });
  }, [authUser]);

  if (loading || authLoading || fetchLoading) {
    return <Loading />;
  }

  if (!authUser?.uid) {
    navigate("/");
  }

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row className="vh-100">
        <Col sm={2} className="col-lg-2 bg-success p-4">
          <h3 className="mb-5 text-uppercase fw-bold text-white">Dashboard</h3>
          <Nav variant="pills" className="flex-column">
            <Nav.Item className="btn w-100 mb-3 btn-light">
              <Nav.Link eventKey="first">User Profile</Nav.Link>
            </Nav.Item>
            {validator && (
              <Nav.Item className="btn w-100 mb-3 btn-light">
                <Nav.Link eventKey="second">Submitted Answer</Nav.Link>
              </Nav.Item>
            )}
            <Nav.Item className="btn w-100 mb-3 btn-light">
              <Nav.Link eventKey="mySubmittedQuestions">My Submitted Questions</Nav.Link>
            </Nav.Item>
            {validator && (
              <Nav.Item className="btn w-100 mb-3 btn-light">
                <Nav.Link eventKey="users">Users</Nav.Link>
              </Nav.Item>
            )}
          </Nav>
        </Col>
        <Col sm={10} className="p-5">
          <div className="bg-warning p-5 mb-3">
            <button
              onClick={() => {
                signOut();
                localStorage.removeItem("accessToken");
              }}
              className="btn btn-dark"
            >
              Sign Out
            </button>
          </div>
          <Tab.Content>
            <Tab.Pane eventKey="first" className="d-flex justify-content-center align-items-center">
              <div>
                <h1>
                  Welcome <span className="text-success">{authUser?.displayName}</span> to Dashboard!
                </h1>
                <button className="btn btn-primary" onClick={() => navigate("/questions")}>
                  Start Test
                </button>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <AllSubmittedAnswers />
            </Tab.Pane>
            <Tab.Pane eventKey="mySubmittedQuestions">
              <MySubmittedQuestions />
            </Tab.Pane>
            <Tab.Pane eventKey="users">
              <Users />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default Dashboard;
