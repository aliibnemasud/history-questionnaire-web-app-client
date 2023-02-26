import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import auth from "../../firebase.init";

const Answers = () => {
  const [hell, setHello] = useState("yes");
  const { questionId } = useParams();
  const [authUser, authLoading, autherror] = useAuthState(auth);
  const [questionAnswer, setQuestionAnswer] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/questions/${questionId}`).then((res) => {
      setQuestionAnswer(res?.data?.data[0]?.questionAnswer);
    });
  }, []);

  console.log(questionAnswer[8]?.answer[0]);

  return (
    <section className="container p-5">

      {/* question No #7 */}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">         
          {questionAnswer[6]?.question}
        </h4>

        <h5 className="text-success">Answer: </h5>

        <div>          
            {
              questionAnswer[6]?.answer[0]?.Biological_Parents === 'no' && 
              <h5> {authUser?.displayName} parents were never married to each other.</h5>              
            }          
            {
              questionAnswer[6]?.answer[0]?.Biological_Parents === 'yes' && 
              <h5> {authUser?.displayName} parents are married to each other.</h5>              
            }          
        </div>
      </div>

      {/* question No #8 */}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">         
          {questionAnswer[7]?.question}
        </h4>

        <h5 className="text-success">Answer: </h5>

        <div>          
            {
              questionAnswer[6]?.answer[0]?.Biological_Parents === 'no' && 
              <h5> {authUser?.displayName} parents were never married to each other.</h5>              
            }          
            {
              questionAnswer[6]?.answer[0]?.Biological_Parents === 'yes' && 
              <h5> {authUser?.displayName} parents are married to each other.</h5>              
            }          
        </div>
      </div>





    </section>
  );
};

export default Answers;
