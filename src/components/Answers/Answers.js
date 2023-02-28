import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";

const Answers = () => {
  const [hell, setHello] = useState("yes");
  const { questionId } = useParams();
  const [authUser, authLoading, autherror] = useAuthState(auth);
  const [questionAnswer, setQuestionAnswer] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/questions/${questionId}`).then((res) => {
      setQuestionAnswer(res?.data?.data[0]?.questionAnswer);
      setLoading(false);
    });
  }, []);

  // console.log(questionAnswer[0]?.answer[0]);

  /* const answers = [
    {
      questionNo: 7,
      question: "Are your biological parents married to each other?",
      answer: `${authUser?.displayName} grew up with ${questionAnswer[8]?.answer[0]?.Growing_Up} in the household.`,
    },

  ]; */

  // console.log(answers)

  if (loading) return <Loading />;

  return (
    <section className="container p-5">
      {/* question No #7 */}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">7. {questionAnswer[6]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          {questionAnswer[6]?.answer[0]?.Biological_Parents === "no" && <h5> {authUser?.displayName} parents were never married to each other.</h5>}
          {questionAnswer[6]?.answer[0]?.Biological_Parents === "yes" && <h5> {authUser?.displayName} parents are married to each other.</h5>}
        </div>
      </div>

      {/* question No #8 */}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">8. {questionAnswer[7]?.question}</h4>
        <h5 className="text-success">Answer: </h5>{" "}
        <div>
          {questionAnswer[6]?.answer[0]?.Biological_Parents === "no" && <h5> {authUser?.displayName} parents were never married to each other.</h5>}
          {questionAnswer[6]?.answer[0]?.Biological_Parents === "yes" && <h5> {authUser?.displayName} parents are married to each other.</h5>}
        </div>
      </div>

      {/* question No #9 */}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">9. {questionAnswer[8]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          <h5>
            {authUser?.displayName} grew up with {questionAnswer[8]?.answer[0]?.Growing_Up} in the household.
          </h5>
        </div>
      </div>

      {/* question No #10*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">10. {questionAnswer[9]?.question}</h4>

        <h5 className="text-success">Answer: </h5>
        <div>
          <h5>
            {authUser?.displayName} states that he and his family {questionAnswer[9]?.answer[0]?.Basic_Needs === "no" ? "Never" : ""} went without basic needs.
          </h5>
        </div>
      </div>

      {/* question No #11*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">11. {questionAnswer[10]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>{questionAnswer[10]?.answer[0]?.Experience_any_abuse_or_neglect === "no" ? <h5>He denies a history of abuse or neglect.</h5> : <h5>He endorses a history of abuse/neglect.</h5>}</div>
      </div>

      {/* question No #12*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">12. {questionAnswer[11]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          <h5>
            * {authUser?.displayName} graduated from {questionAnswer[11]?.answer[0]?.Institution_Name} in {questionAnswer[11]?.answer[0]?.Institution_City}, {questionAnswer[11]?.answer[0]?.Institution_State} in {questionAnswer[11]?.answer[0]?.Year_of_graduation}.
          </h5>
          <h5>
            * {authUser?.displayName} was issued his {questionAnswer[11]?.answer[0]?.Type_of_degree} through Lake Washington College in {questionAnswer[11]?.answer[0]?.Year_of_graduation}.
          </h5>
        </div>
      </div>

      {/* question No #13*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">13. {questionAnswer[12]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          {questionAnswer[12]?.answer[0]?.Attend_University === "no" ? (
            <h5>{authUser?.displayName} did not attend college.</h5>
          ) : (
            <h5>
              He attended the {questionAnswer[12]?.answer[0]?.Attend_University_Name} between {questionAnswer[12]?.answer[0]?.Year_of_graduation} and earned a {questionAnswer[12]?.answer[0]?.Type_of_degree} degree in {questionAnswer[12]?.answer[0]?.Specify}.
            </h5>
          )}
        </div>
      </div>

      {/* question No #14*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">14. {questionAnswer[13]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          {questionAnswer[13]?.answer[0].Job_relevant_certificates === "no" ? (
            <h4>{authUser?.displayName} reports that he hasn't any Job Related certification</h4>
          ) : (
            <h4>
              {authUser?.displayName} reports that he has successfully completed his {questionAnswer[13]?.answer[0]?.Specify_type_of_certificate} certification in {questionAnswer[13]?.answer[0]?.Earned_Year}
            </h4>
          )}
        </div>
      </div>

      {/* question No #15*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">15. {questionAnswer[14]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          <h4>
            Currently, {authUser?.displayName} {questionAnswer[14]?.answer[0]?.Timeline} as a {questionAnswer[14]?.answer[0]?.Job_Title} for {questionAnswer[14]?.answer[0]?.Place_of_employment}
          </h4>

          <h4>
            Previously, he worked as a {questionAnswer[15]?.answer[0]?.Job_Title_One} for {questionAnswer[15]?.answer[0]?.Place_of_employment_One}
          </h4>

          <h4>
            And, he worked as a {questionAnswer[15]?.answer[0]?.Job_Title_Two} for {questionAnswer[15]?.answer[0]?.Place_of_employment_Two} the second employment history.
          </h4>
        </div>
      </div>

      {/* question No #16*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">16. {questionAnswer[15]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          <p>First position:</p>
          <h1></h1>
        </div>
      </div>

      {/* question No #17*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">17. {questionAnswer[16]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          <h4>
            Currently, {authUser?.displayName} {questionAnswer[14]?.answer[0]?.Timeline} as a {questionAnswer[14]?.answer[0]?.Job_Title} for {questionAnswer[14]?.answer[0]?.Place_of_employment}
          </h4>
        </div>
      </div>

      {/* question No #18*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">18. {questionAnswer[17]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          <h4>
            {authUser?.displayName} indicates that he was an {questionAnswer[14]?.answer[0]?.Job_relevant_Experience}
          </h4>
        </div>
      </div>

      {/* question No #19*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">19. {questionAnswer[18]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          <h4>
            {authUser?.displayName} lives in {questionAnswer[18]?.answer[0]?.living_City_State} with his {questionAnswer[18]?.answer[0]?.Who_do_you_live_with}
          </h4>
        </div>
      </div>

      {/* question No #20*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">20. {questionAnswer[19]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          {questionAnswer[19]?.answer[0]?.Relationship_Status === "Single" && <h4>{authUser?.displayName} is single.</h4>}
          {questionAnswer[19]?.answer[0]?.Relationship_Status === "In a relationship" && (
            <h4>
              {authUser?.displayName} has been In a Relationship for {questionAnswer[19]?.answer[0]?.How_long_have_you_been_in_this_relationship} years
            </h4>
          )}

          {questionAnswer[19]?.answer[0]?.Relationship_Status === "Engaged" && (
            <h4>
              {authUser?.displayName} has been married for {questionAnswer[19]?.answer[0]?.How_long_have_you_been_married} years
            </h4>
          )}

          {questionAnswer[19]?.answer[0]?.Relationship_Status === "Divorced/single" && (
            <h4>
              {authUser?.displayName} is divorced {questionAnswer[19]?.answer[0]?.Timeline_of_current_relationship} years
            </h4>
          )}
        </div>
      </div>

      {/* question No #21*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">21. {questionAnswer[20]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          {questionAnswer[20]?.answer[0]?.Children === "no" && <h4>{authUser?.displayName} has no children.</h4>}
          {questionAnswer[20]?.answer[0]?.Children === "yes" && (
            <h4>
              {authUser?.displayName} has a {questionAnswer[20]?.answer[0]?.Son_Or_Daughter} ({questionAnswer[20]?.answer[0]?.Children_Age} years old).
            </h4>
          )}
        </div>
      </div>

      {/* question No #22*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">22. {questionAnswer[21]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          {questionAnswer[21]?.answer[0]?.Alcohol === "no" && <h4>{authUser?.displayName} has no history of alcohol use.</h4>}

          {questionAnswer[21]?.answer[0]?.Alcohol === "yes" && (
            <h4>
              {authUser?.displayName} has history of alcohol {questionAnswer[21]?.answer[0]?.Times} per {questionAnswer[21]?.answer[0]?.Drinks_per_time}.
            </h4>
          )}
        </div>
      </div>

      {/* question No #23*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">23. {questionAnswer[22]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          {questionAnswer[22]?.answer[0]?.Alcohol_related_issues === "no" && <h4>{authUser?.displayName} has no history of alcohol use.</h4>}
          {questionAnswer[22]?.answer[0]?.Alcohol_related_issues === "yes" && <h4>{authUser?.displayName} has history of alcohol Related Issue.</h4>}
        </div>
      </div>

      {/* question No #24*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">24. {questionAnswer[23]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          {questionAnswer[23]?.answer[0]?.Drugs_illicit === "no" ? (
            <h4>{authUser?.displayName} used drugs/illicit substances.</h4>
          ) : (
            <h4>
              {authUser?.displayName} has used {questionAnswer[23]?.answer[0]?.Type_of_drug} per {questionAnswer[23]?.answer[0]?.Drugs_Frequency} and {questionAnswer[23]?.answer[0]?.Timeline_of_use}{" "}
            </h4>
          )}
        </div>
      </div>

      {/* question No #25*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">25. {questionAnswer[24]?.question}</h4>
        <h5 className="text-success">Answer: </h5>

        <div>
          {questionAnswer[24]?.answer[0]?.Drug_related_issues === "no" && <h4>{authUser?.displayName} has no history ever used drugs/illicit substances.</h4>}

          {questionAnswer[24]?.answer[0]?.Drug_related_issues === "yes" && (
            <h4>
              {authUser?.displayName} has used drugs/illicit substances {questionAnswer[24]?.answer[0]?.Drugs_Frequency} per {questionAnswer[24]?.answer[0]?.Type_of_drug}.
            </h4>
          )}
        </div>
      </div>

      {/* question No #26*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">26. {questionAnswer[25]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          {questionAnswer[25]?.answer[0]?.Health_symptoms === "no" && <h4>{authUser?.displayName} never attended counseling or psychotherapy services.</h4>}
          {questionAnswer[25]?.answer[0]?.Health_symptoms === "yes" && (
            <h4>
              Yes, {authUser?.displayName} has drug-related issues/concerns. Specify Symptoms: {questionAnswer[25]?.answer[0]?.Specify_Symptoms} and Timeline of experienced symptoms: {questionAnswer[25]?.answer[0]?.Timeline_of_experienced_symptoms} , {questionAnswer[25]?.answer[0]?.Drug_related_add}
            </h4>
          )}
        </div>
      </div>

      {/* question No #27*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">27. {questionAnswer[26]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          {questionAnswer[26]?.answer[0]?.Psychotherapy_services === "no" && <h4>{authUser?.displayName} never attended counseling or psychotherapy services.</h4>}
          {questionAnswer[26]?.answer[0]?.Psychotherapy_services === "yes" && (
            <h4>
              {authUser?.displayName} attended counseling or psychotherapy services at Dates of attendance:{questionAnswer[26]?.answer[0]?.Dates_of_attendance} Number of sessions: {questionAnswer[26]?.answer[0]?.Number_of_sessions}.
            </h4>
          )}
        </div>
      </div>

      {/* question No #28*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">28. {questionAnswer[27]?.question}</h4>
        <h5 className="text-success">Answer: </h5>

        <div>
          {questionAnswer[27]?.answer[0]?.Psychiatric_purposes === "no" && <h4>{authUser?.displayName} never prescribed medication for psychiatric purposes.</h4>}

          {questionAnswer[27]?.answer[0]?.Psychiatric_purposes === "yes" && (
            <h4>
              {authUser?.displayName} attend {questionAnswer[27]?.answer[0]?.Type_of_medication} for {questionAnswer[27]?.answer[0]?.Reason_for_prescription}. And he take it {questionAnswer[27]?.answer[0]?.When_did_you_take_the_medication} Dosage: {questionAnswer[27]?.answer[0]?.Dosage}{" "}
            </h4>
          )}
        </div>
      </div>

      {/* question No #29*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">29. {questionAnswer[28]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          {questionAnswer[28]?.answer[0]?.Psychiatric_reason === "no" && <h4>{authUser?.displayName} never hospitalized for a psychiatric reason.</h4>}

          {questionAnswer[28]?.answer[0]?.Psychiatric_reason === "yes" && (
            <h4>
              {authUser?.displayName} attend {questionAnswer[28]?.answer[0]?.Type_of_medication} for {questionAnswer[28]?.answer[0]?.Reason_short_answer}. And he take it {questionAnswer[28]?.answer[0]?.Psychiatric_reason_Timeline} Location:{" "}
              {questionAnswer[28]?.answer[0]?.Psychiatric_reason_Location}, Psychiatric reason Name of hospital: {questionAnswer[28]?.answer[0]?.Psychiatric_reason_Name_of_hospital}, Extra Reason: {questionAnswer[28]?.answer[0]?.Psychiatric_reason_add}{" "}
            </h4>
          )}
        </div>
      </div>

      {/* question No #30*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">30. {questionAnswer[29]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          <h4>{questionAnswer[29]?.answer[0]?.Thoughts_about_suicide}</h4>
        </div>
      </div>

      {/* question No #31*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">31. {questionAnswer[30]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          <h4>{questionAnswer[30]?.answer[0]?.Self_harm_behaviors}</h4>
        </div>
      </div>

      {/* question No #32*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">32. {questionAnswer[31]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          <h4>{questionAnswer[31]?.answer[0]?.Harming_someone_else}</h4>
        </div>
      </div>

      {/* question No #33*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">33. {questionAnswer[32]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          <h4>{questionAnswer[32]?.answer[0]?.Visual_hallucination}</h4>
        </div>
      </div>

      {/* question No #34*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">34. {questionAnswer[33]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          <h4>{questionAnswer[33]?.answer[0]?.Delusional_Thoughts}</h4>
        </div>
      </div>

      {/* question No #35*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">35. {questionAnswer[34]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          {questionAnswer[34]?.answer[0]?.Unconscious_accident === "no" && <h4>No</h4>}
          {questionAnswer[34]?.answer[0]?.Unconscious_accident === "yes" && <h4>Yes, It was {questionAnswer[34]?.answer[0]?.Unconscious_accident_Year} </h4>}

          <ul>
            <li>Sort Answer: {questionAnswer[34]?.answer[0]?.Experience_Prolonged_Symptoms_sort_answer}</li>
            <li>Timeline: {questionAnswer[34]?.answer[0]?.How_long_did_you_lose_consciousness_for}</li>
          </ul>
        </div>
      </div>

      {/* question No #36*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">36. {questionAnswer[35]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          {questionAnswer[35]?.answer[0]?.Credit_related_difficulties === "no" && <h4>No</h4>}
          {questionAnswer[35]?.answer[0]?.Credit_related_difficulties === "yes" && (
            <>
              <h4>Yes</h4>
              <ul>
                <li>Sort Answer: {questionAnswer[35]?.answer[0]?.Credit_related_difficulties_timeline}</li>
                <li>Date: {questionAnswer[35]?.answer[0]?.Credit_related_difficulties_Explain}</li>
              </ul>
            </>
          )}
        </div>
      </div>

      {/* question No #36*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">37. {questionAnswer[36]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          {questionAnswer[36]?.answer[0]?.Traffic_violation === "no" && <h4>No</h4>}
          {questionAnswer[36]?.answer[0]?.Traffic_violation === "yes" && (
            <>
              <h4>Yes</h4>
              <ul>
                <li>Sort Answer: {questionAnswer[36]?.answer[0]?.Traffic_violation_Explain}</li>
                <li>Date: {questionAnswer[36]?.answer[0]?.Traffic_violation_date}</li>
              </ul>
            </>
          )}
        </div>
      </div>


      {/* question No #37*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">38. {questionAnswer[37]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          {questionAnswer[37]?.answer[0]?.Charged_criminal_offense === "no" && <h4>No</h4>}
          {questionAnswer[37]?.answer[0]?.Charged_criminal_offense === "yes" && (
            <>
              <h4>Yes</h4>
              <ul>
                <li>What were the consequences: {questionAnswer[37]?.answer[0]?.What_were_the_consequences}</li>
                <li>Were you arrested: {questionAnswer[37]?.answer[0]?.Were_you_arrested}</li>
                <li>Date: {questionAnswer[37]?.answer[0]?.Charged_criminal_offense_date}</li>
              </ul>
            </>
          )}
        </div>
      </div>

      {/* question No #39*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">39. {questionAnswer[38]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          <h4>{questionAnswer[38]?.answer[0]?.Hobbies_and_interests}</h4>
        </div>
      </div>

      {/* question No #40*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">40. {questionAnswer[39]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          <h4>{questionAnswer[39]?.answer[0]?.Job_relevant_skills}</h4>
        </div>
      </div>

      {/* question No #41*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">41. {questionAnswer[40]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          <h4>{questionAnswer[40]?.answer[0]?.Stressed}</h4>
        </div>
      </div>

      {/* question No #42*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">42. {questionAnswer[41]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          <h4>{questionAnswer[41]?.answer[0]?.Cope_with_stress}</h4>
        </div>
      </div>

      {/* question No #43*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">43. {questionAnswer[43]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          <h4>{questionAnswer[43]?.answer[0]?.Particularly_angry}</h4>
        </div>
      </div>

      {/* question No #44*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">44. {questionAnswer[43]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          <h4>{questionAnswer[43]?.answer[0]?.cope_with_anger}</h4>
        </div>
      </div>
      {/* question No #45*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">45. {questionAnswer[44]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          <h4>{questionAnswer[44]?.answer[0]?.faced_adversity}</h4>
        </div>
      </div>

      {/* question No #46*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">46. {questionAnswer[45]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          <h4>{questionAnswer[45]?.answer[0]?.with_adversity}</h4>
        </div>
      </div>

      {/* question No #47*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">47. {questionAnswer[46]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          <h4>{questionAnswer[46]?.answer[0]?.short_term_goals}</h4>
        </div>
      </div>

      {/* question No #48*/}
      <div style={{ backgroundColor: "#fff" }} className="p-4 mb-2">
        <h4 className="form-label my-3">48. {questionAnswer[47]?.question}</h4>
        <h5 className="text-success">Answer: </h5>
        <div>
          <h4>{questionAnswer[47]?.answer[0]?.long_term_goals}</h4>
        </div>
      </div>
    </section>
  );
};

export default Answers;
