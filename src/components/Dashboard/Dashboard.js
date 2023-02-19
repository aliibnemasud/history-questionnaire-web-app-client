import React from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useNavigate } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import AllSubmittedAnswers from "./AllSubmittedAnswers";

const Dashboard = () => {
  const [signOut, loading, error] = useSignOut(auth);
  const [authuser, authLoading, autherror] = useAuthState(auth);
  const navigate = useNavigate();

  if (!authuser?.uid) {
    navigate("/");
  }

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row className="vh-100">
        <Col sm={2} className="col-lg-2 bg-success p-4">
        <h3 className="mb-5 text-uppercase fw-bold text-white">Dashboard</h3>
          <Nav variant="pills" className="flex-column">
            <Nav.Item className="btn w-100 mb-3 btn-light">
              <Nav.Link  eventKey="first">User Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item className="btn w-100 mb-3 btn-light">
              <Nav.Link eventKey="second">Submitted Answer</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={10} className="p-5">
        <div className="bg-warning p-5 mb-3">
          <button onClick={() => signOut()} className="btn btn-dark">
            Sign Out
          </button>
        </div>
          <Tab.Content>
            <Tab.Pane eventKey="first">

            <h1>Welcome to Dashboard!</h1>
          <button className="btn btn-primary" onClick={() => navigate("/questions")}>
            Start Test
          </button>

            </Tab.Pane>
            <Tab.Pane eventKey="second">
             <AllSubmittedAnswers/>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>    
  );
};

export default Dashboard;