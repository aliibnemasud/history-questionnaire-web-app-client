import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";


const AllSubmittedAnswers = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate()

  const token = localStorage.getItem('accessToken')

  useEffect(() => {
    axios.get("https://questionary-website.onrender.com/questions", {
      headers: {
        "authorization": `Barer ${token}`
      }
    })
    .then((res) => {
      setQuestions(res.data.data);
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
          {questions.map((question, index) => {
            let name = question.questionAnswer[0].answer[0].First_Name + " " + question?.questionAnswer[0]?.answer[0]?.Last_Name;
            return (
              <tr>
                <td>{index+1}</td>
                <td>{name}</td>
                <td>{question?.email}</td>
                <td><span className={`badge ${ question?.status !== 'approved' ? 'text-bg-warning': "text-bg-success" }`}>{question?.status}</span></td>
                <td>
                  <button onClick={()=> navigate(`/seeAnswer/${question?._id}`)} className="btn btn-warning fw-bold">View Answer</button>
                  <button onClick={()=> navigate(`/answers/${question?._id}`)} className="btn btn-success ml-2 fw-bold">View Detail Answer</button>
                </td>
                <td>
                  <button className="btn btn-success fw-bold mx-2">Approved</button>
                  <button className="btn btn-danger fw-bold">Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default AllSubmittedAnswers;
