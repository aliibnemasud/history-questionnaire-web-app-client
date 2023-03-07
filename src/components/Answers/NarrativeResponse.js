import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import auth from "../../firebase.init";
import { siblings } from "../Questions/data";
import Loading from "../Shared/Loading";
import './NartiveResponse.css'

const NarrativeResponse = () => {
  const { questionId } = useParams();
  const [authUser, authLoading, autherror] = useAuthState(auth);
  const [questionAnswer, setQuestionAnswer] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://questionary-website.onrender.com/questions/${questionId}`).then((res) => {
      setQuestionAnswer(res?.data?.data[0]?.questionAnswer);
      setLoading(false);
    });
  }, []);

  if (loading || authLoading) return <Loading />;

  const name = questionAnswer[0]?.answer[0]?.First_Name + " " + questionAnswer[0]?.answer[0]?.Last_Name;
  const gender = questionAnswer[2]?.answer[0]?.Gender === "Male" ? "He" : "She";
  const address = questionAnswer[5]?.answer[0]?.City + "," + questionAnswer[5]?.answer[0]?.State + ", " + questionAnswer[5]?.answer[0]?.Ages + ", " + questionAnswer[5]?.answer[0]?.Other_Address;

  // question 9
  const q9 = questionAnswer[8]?.answer[0]?.Growing_Up;
  // question 10
  const q10 = questionAnswer[9]?.answer[0];
  // Question 11
  const q11 = questionAnswer[10]?.answer[0];
  // Question 12
  const q12 = questionAnswer[11]?.answer[0];
  // Question 13
  const q13 = questionAnswer[12]?.answer[0];
  // Question 14
  const q14 = questionAnswer[13]?.answer[0];
  // Question 15
  const q15 = questionAnswer[14]?.answer[0];
  // Question 16
  const q16 = questionAnswer[15]?.answer[0];
  // Question 17
  const q17 = questionAnswer[16]?.answer[0];
  // Question 18
  const q18 = questionAnswer[17]?.answer[0];
  // Question 19
  const q19 = questionAnswer[18]?.answer[0];
  // Question 20
  const q20 = questionAnswer[19]?.answer[0];
  // Question 21
  const q21 = questionAnswer[20]?.answer[0];
  // Question 22
  const q22 = questionAnswer[21]?.answer[0];
  // Question 23
  const q23 = questionAnswer[22]?.answer[0];
  // Question 24
  const q24 = questionAnswer[23]?.answer[0];
  // Question 25
  const q25 = questionAnswer[24]?.answer[0];
  // Question 26
  const q26 = questionAnswer[25]?.answer[0];
  // Question 27
  const q27 = questionAnswer[26]?.answer[0];
  // Question 28
  const q28 = questionAnswer[27]?.answer[0];
  // Question 29
  const q29 = questionAnswer[28]?.answer[0];
  // Question 30
  const q30 = questionAnswer[29]?.answer[0];
  // Question 31
  const q31 = questionAnswer[30]?.answer[0];
  // Question 32
  const q32 = questionAnswer[31]?.answer[0];
  // Question 33
  const q33 = questionAnswer[32]?.answer[0];
  // Question 34
  const q34 = questionAnswer[33]?.answer[0];
  // Question 35
  const q35 = questionAnswer[34]?.answer[0];
  // Question 36
  const q36 = questionAnswer[35]?.answer[0];
  // Question 37
  const q37 = questionAnswer[36]?.answer[0];
  // Question 38
  const q38 = questionAnswer[37]?.answer[0];
  // Question 39
  const q39 = questionAnswer[38]?.answer[0];
  // Question 40
  const q40 = questionAnswer[39]?.answer[0];
  // Question 41
  const q41 = questionAnswer[40]?.answer[0];
  // Question 42
  const q42 = questionAnswer[41]?.answer[0];
  // Question 43
  const q43 = questionAnswer[42]?.answer[0];
  // Question 44
  const q44 = questionAnswer[43]?.answer[0];
  // Question 45
  const q45 = questionAnswer[44]?.answer[0];
  // Question 46
  const q46 = questionAnswer[45]?.answer[0];
  // Question 47
  const q47 = questionAnswer[46]?.answer[0];
  // Question 48
  const q48 = questionAnswer[47]?.answer[0];

  const parentsStatus = questionAnswer[5]?.answer[0]?.Biological_Parents === "yes" ? "married to each other" : " Divorced";

  const sibKeys = questionAnswer[7]?.answer[0];
  // Making the multiple siblings count and print a string output
  function siblingsStr(sibObject) {
    const sibKeys = Object.values(sibObject);
    const counts = {};
    let str = "";
    sibKeys.forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1;
    });
    for (const [key, value] of Object.entries(counts)) {
      if (key === "younger" || key === "older") {
        continue;
      }
      str += `${value} ${key}, `;
    }
    let strOutput = " has " + str.slice(0, -2);
    return strOutput;
  }

  const siblingsStrOutput = gender + siblingsStr(sibKeys);

  return (
    <div className="container my-5">
      <div className="box-shadow">
        <h3 className="fw-bold">Answer: </h3>
        <p>
          <span className="fw-bold text-success underline">Background Information: </span> {name} grew up in {address}, his parents {parentsStatus} when {gender} was five years old, and {siblingsStrOutput} with whom he was raised. Following the {parentsStatus} of their parents, {name} and his
          siblings were and his siblings were raised by {q9}.{name} {questionAnswer[9]?.answer[0]?.Basic_Needs === "no" ? "denies having ever gone without basic needs" : " family deprived him of basic needs"} and {gender}{" "}
          {questionAnswer[10]?.answer[0]?.Experience_any_abuse_or_neglect === "no" ? "denies a history of abuse or neglect" : " confirm a history of abuse or neglect"}.{name} graduated from {questionAnswer[11]?.answer[0]?.Institution_Name} in {questionAnswer[11]?.answer[0]?.Year_of_graduation} and
          attended some college at {questionAnswer[12]?.answer[0]?.Attend_University_Name_1} between {questionAnswer[11]?.answer[0]?.Year_of_graduation} and {questionAnswer[12]?.answer[0]?.Year_of_Graduation_1} {gender}{" "}
          {questionAnswer[12]?.answer[0]?.Associate_1 === "no degree" ? "but does not hold a " : `and achieved ${questionAnswer[12]?.answer[0]?.Associate_1}`} postsecondary degree. Currently, {name} works as a {q15.Job_Title} at {q15.Place_of_employment} and has been doing so since {q15.Timeline}.
          Prior, {name} worked as a {q16?.Job_Title_One} at {q16?.Place_of_employment_One} between {q16.Timeline_One} and was an {q16?.Job_Title_Two} for {q16?.Place_of_employment_Second} between {q16?.Timeline_Two}.{name}{" "}
          {q17?.Served_military === "no" ? "doesn't served in the military" : "served in the military"}
          {name} {q18?.Job_relevant_Experience === "N/A" ? "don't have job-relevant volunteer experience" : `have job-relevant volunteer experience like ${q18?.Job_relevant_Experience}`}. currently {gender} lived in {q20?.living_City_State} with {q20?.Who_do_you_live_with}
          {q20?.Relationship_Status === "Single" && <h4>{name} is single.</h4>}
          {q20?.Relationship_Status === "In a relationship" && (
            <p>
              {authUser?.displayName} has been In a Relationship for {q20?.How_long_have_you_been_in_this_relationship} years
            </p>
          )}
          {q20?.Relationship_Status === "Engaged" && (
            <p>
              {name} has been married for {q20?.answer[0]?.How_long_have_you_been_married} years
            </p>
          )}
          {q20?.Relationship_Status === "Divorced/single" && (
            <p>
              {name} is divorced {q20?.Timeline_of_current_relationship} years
            </p>
          )}
          {q20?.Relationship_Status === "Married" && (
            <p>
              {name} is Married {q20?.How_long_have_you_been_married} years. and together from {q20?.How_long_have_you_been_together}
            </p>
          )}
        </p>{" "}
        <br />
        <p>
          <span className="fw-bold text-success underline">Children: </span>
          {name} has {q21?.Children === 'no' ? "no children" : "children"}
        </p>

        <p>
          <span className="fw-bold text-success underline">Alcohol and Drug Use History: </span> <br />
            {name} {q22?.Alcohol === 'no' ? "don't drink alcohol" : `reports that ${gender} drinks used to drink ${q22?.Times} per ${q22?.Drinks_per_time}`}, and


            {gender} {q23?.Alcohol_related_issues === 'no' ? " denies a history of alcohol-related issues" : " has history of alcohol-related issues/concerns" }.
            {
              q24?.Drugs_Frequency === 'I don’t use it anymore' ? `${gender} don’t use it anymore` : `In the past, ${gender} used used ${q24?.Type_of_drug} per ${q24?.Drugs_Frequency} and ${q24?.Timeline_of_use}`}.

              {q25?.Drug_related_issues === 'no' ? `${name} denies any other history of drug use.` : 
              `${name} has history of drug use.`}
        </p> <br />

        <p>
        <span className="fw-bold text-success underline">Psychological History: </span> <br />

        {name} reports that {q26?.Health_symptoms === 'no' ? 'no history of mental health symptoms or diagnoses' : `in ${q26?.Timeline_of_experienced_symptoms} or so ${gender} was diagnosed with ${q26?.Specify_Symptoms} ${q26?.Drug_related_add}`}

        {gender} also {q27?.Psychotherapy_services === 'no' ? "no history of attended counseling or psychotherapy" : `in ${q27?.Dates_of_attendance} or so he was attend ${q27?.Number_of_sessions} ${q27?.Number_of_sessions}`}.

        {q28?.Psychiatric_purposes === 'no'? '' : '' }


        </p>


        



      </div>
    </div>
  );
};

export default NarrativeResponse;
