import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnswersDetails from "./AnswersDetails";

const SeeAnswer = () => {
  const { questionId } = useParams();

  const [questionAnswer, setQuestionAnswer] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/questions/${questionId}`).then((res) => {
      setQuestionAnswer(res?.data?.data[0]?.questionAnswer);
    });
  }, [questionAnswer, questionId]);
 
  return (
    <div style={{ backgroundColor: "#F1F3F5" }}>
      <div className="p-3 bg-success text-white text-center">
        <h1>Questions Answers</h1>
      </div>

      <section className="container p-5">
        {questionAnswer.map((question) => <AnswersDetails question={question} key={question?._id} />)}        
      </section>
    </div>
  );
};

export default SeeAnswer;
