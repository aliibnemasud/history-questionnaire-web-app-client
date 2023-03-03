import React from "react";

const AnswersDetails = ({ question }) => {
  
  let answers = [];
  for (let key in question.answer[0]) {
    let splitedKey = key.split("_");
    let newKey = "";
    splitedKey.map((str) => {
      newKey = newKey + " " + str;
    });
    answers.push(
      <h5>
        <span className="text-danger fw-bold">{newKey}: </span>
        {question.answer[0][key]}
      </h5>
    );
  }

  return (
    <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
      <h4 className="form-label my-3">
        {question?.questionNo}. {question?.question}{" "}
      </h4>
      <h5 className="text-success">Answer: </h5>
      <div>{answers}</div>
    </div>
  );
};

export default AnswersDetails;
