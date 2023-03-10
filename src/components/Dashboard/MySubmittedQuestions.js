import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";


const MySubmittedQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate()
  const [user] = useAuthState(auth)

  const token = localStorage.getItem('accessToken')

  useEffect(() => {
    axios.get(`https://questionary-website.onrender.com/myQuestions?email=${user?.email}`, {
      headers: {
        "authorization": `Barer ${token}`
      }
    })    
    .then((data) => {
      setQuestions(data?.data?.data);
    });
  }, []);

  return (
    <div>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>#ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Test Status</th>
            <th>Answer</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {questions?.map((question) => {
            let name = question.questionAnswer[0].answer[0].First_Name + " " + question?.questionAnswer[0]?.answer[0]?.Last_Name;
            return (
              <tr>
                <td>1</td>
                <td>{name}</td>
                <td>{question?.email}</td>
                <td> <span className={`badge ${ question?.status !== 'approved' ? 'text-bg-warning': "text-bg-success" }`}>{question?.status}</span></td>
                <td>
                  <button onClick={()=> navigate(`/seeAnswer/${question?._id}`)} className="btn btn-warning fw-bold">View My Answer</button>
                </td>
                <td>
                  <button disabled={question?.status !== 'approved'} className="btn btn-success fw-bold mx-2">Take Second Test</button>
                  {/* <button className="btn btn-danger fw-bold">Delete</button> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default MySubmittedQuestions;
