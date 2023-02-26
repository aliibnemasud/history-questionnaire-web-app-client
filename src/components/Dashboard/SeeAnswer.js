import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import AnswersDetails from "./AnswersDetails";

const SeeAnswer = () => {
  const { questionId } = useParams();
  const [authUser, authLoading, autherror] = useAuthState(auth);
  const [validator, setValidator] = useState([]);
  const token = localStorage.getItem("accessToken");

  const [questionAnswer, setQuestionAnswer] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/questions/${questionId}`).then((res) => {
      setQuestionAnswer(res?.data?.data[0]?.questionAnswer);
    });
  }, [questionAnswer, questionId]);

  useEffect(() => {
    axios.get(`http://localhost:5000/user/validator?email=${authUser?.email}`, {
        headers: {
          Authorization: `Barer ${token}`,
        },
      })
      .then((res) => {
        setValidator(res?.data?.validator);
      });
  }, [authUser]);

  const handleApprove = (id) => {
    const approved = window.confirm("Are you sure want to approve for the next step?");
    if (approved) {
      axios.patch(`http://localhost:5000/questions/${id}`)
      .then((res) => {
        console.log(res);
        toast.success("Candidate Approved for the Next Step...");
      });
    }
  };

  return (
    <div style={{ backgroundColor: "#F1F3F5" }}>
      <div className="p-3 bg-success text-white text-center">
        <div>         
          <Link to='/dashboard' className="btn btn-light">Dashboard</Link>
        </div>
        <h1>Questions Answers</h1>
      </div>

      <section className="container p-5">
        {questionAnswer.map((question) => (
          <AnswersDetails question={question} key={question?._id} />
        ))}
        <section>
          {validator && (
            <button className="btn btn-primary" onClick={() => handleApprove(questionId)}>
              Approve For Next Step
            </button>
          )}
        </section>
      </section>
    </div>
  );
};

export default SeeAnswer;
