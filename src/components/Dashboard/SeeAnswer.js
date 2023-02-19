import axios from "axios";
import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

const SeeAnswer = () => {
  const { questionId } = useParams();

  const [questionAnswer, setQuestionAnswer] = useState([]);


  useEffect(() => {
    axios.get(`http://localhost:5000/questions/${questionId}`)
    .then(res => {
        setQuestionAnswer(res?.data?.data[0]?.questionAnswer)
    })    
  }, [questionAnswer, questionId])

  console.log(questionAnswer)
  

  return (
    <div style={{backgroundColor: '#F1F3F5'}}>
      <div className="p-3 bg-success text-white text-center">
        <h1>Questions Answers</h1>
      </div>

      <section className="container p-5">

        {
            questionAnswer.map(question => {
                return <div style={{backgroundColor: "#fff"}} className="p-4 mb-2">
                <h4 className="form-label my-3">{question?.questionNo}. {question?.question} </h4>
                <h5 className="text-success">Answer: </h5>                              
                <div>
                <h5><span className="text-danger fw-bold">First Name:</span> Ali Ibne Masud</h5>                 
                </div>
              </div>
            })
        }

        <div>
          <h2 className="form-label my-3">1. What is your legal name?</h2>
          <h5 className="text-success">Answer: </h5>
          <div className="">
          <h5><span className="text-danger fw-bold">First Name:</span> Ali Ibne Masud</h5>                 
          </div>
        </div>

      </section>
    </div>
  );
};

export default SeeAnswer;
