import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
const AllSubmittedAnswers = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:5000/questions").then((res) => {
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
          {questions.map((question) => {
            let name = question.questionAnswer[0].answer[0].First_Name + " " + question?.questionAnswer[0]?.answer[0]?.Last_Name;
            return (
              <tr>
                <td>1</td>
                <td>{name}</td>
                <td>candidatemail@exmple.com</td>
                <td>In Progress</td>
                <td>
                  <button onClick={()=> navigate(`/seeAnswer/${question?._id}`)} className="btn btn-warning fw-bold">View Answer</button>
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
