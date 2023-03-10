/* eslint-disable no-undef */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { applyingPosition, militaryBranch, siblings } from "./data";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../Shared/Loading";
import auth from "../../firebase.init";
import { useNavigate } from "react-router-dom";

const Questions = () => {
  const [position, setPosition] = useState("");
  const [biologicalParentsStatus, setBiologicalParentsStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const [atuhUser, authLoading] = useAuthState(auth);
  const navigate = useNavigate();
  // marriage
  const [preMarriageTimeline, setPreMarriageTimeline] = useState(1);
  const [numberOfUniversity, setNumberOfUniversity] = useState(1);
  const [numberOfChildren, setNumberOfChildren] = useState(1);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const token = localStorage.getItem("accessToken");

  const onSubmit = (data) => {
    // Making Siblings Multiple Values
    // setLoading(true);
    const siblingsArray = {};
    for (const sib in data) {
      if (sib.startsWith("Siblings")) {
        siblingsArray[sib] = data[sib];
      }
      if (sib.startsWith("YoungerOrOlder")) {
        siblingsArray[sib] = data[sib];
      }
    }

    // console.log(siblingsArray)

    // Multiple Marriage timeline
    const multipleMarriageTimeline = {};
    for (const timeline in data) {
      if (timeline.startsWith("Previous_marriages_Timeline")) {
        multipleMarriageTimeline[timeline] = data[timeline];
      }
    }

    // Multiple children data
    const multipleChildData = {};
    for (const timeline in data) {
      if (timeline.startsWith("Son_Or_Daughter_")) {
        multipleChildData[timeline] = data[timeline];
      }
      if (timeline.startsWith("Children_Type_")) {
        multipleChildData[timeline] = data[timeline];
      }
      if (timeline.startsWith("Children_Age_")) {
        multipleChildData[timeline] = data[timeline];
      }
    }

    // Making university Multiple Values
    const allUniversity = {};
    for (const uniValue in data) {
      if (uniValue.startsWith("Attend_University_Name_")) {
        allUniversity[uniValue] = data[uniValue];
      }
      if (uniValue.startsWith("Attend_University_Location_City_")) {
        allUniversity[uniValue] = data[uniValue];
      }
      if (uniValue.startsWith("Attend_University_Location_State_")) {
        allUniversity[uniValue] = data[uniValue];
      }
      if (uniValue.startsWith("Year_of_Graduation_")) {
        allUniversity[uniValue] = data[uniValue];
      }
      if (uniValue.startsWith("Associate_")) {
        allUniversity[uniValue] = data[uniValue];
      }
    }

    let answer = [
      {
        questionNo: 1,
        question: "What is your legal name?",
        answer: [{ First_Name: data.First_Name, Last_Name: data.Last_Name }],
      },
      {
        questionNo: 2,
        question: "What is your date of birth?",
        answer: [{ Date_Of_Birth: data.Date_Of_Birth }],
      },
      {
        questionNo: 3,
        question: "Please identify your gender?",
        answer: [{ Gender: data.Gender }],
      },
      {
        questionNo: 4,
        question: "Which department are you being evaluated for (i.e., specific police department, sheriff's office, dispatch center, fire department, corrections facility, etc.)?",
        answer: [{ Department: data.Department }],
      },
      {
        questionNo: 5,
        question: "What position are you applying for?",
        answer: [{ Position: data.Position, Other_Option: data.Other_Option }],
      },
      {
        questionNo: 6,
        question: "Where did you grow-up?",
        answer: [{ City: data.City, State: data.State, Ages: data.Ages, Other_Address: data.Other_Address }],
      },
      {
        questionNo: 7,
        question: "Are your biological parents married to each other?",
        answer: [{ Biological_Parents: data.Biological_Parents, Biological_Parents_Status: data.Biological_Parents_Status, Deceased: data.Ages, Deceased_Year: data.Deceased_Year }],
      },
      {
        questionNo: 8,
        question: "How many siblings do you have?",
        answer: [siblingsArray],
      },
      {
        questionNo: 9,
        question: "Who was in your household while you were growing up?",
        answer: [{ Growing_Up: data.Growing_Up }],
      },
      {
        questionNo: 10,
        question: "Did your family ever go without basic needs?",
        answer: [{ Basic_Needs: data.Basic_Needs }],
      },
      {
        questionNo: 11,
        question: "Did you experience any abuse or neglect in your childhood?",
        answer: [{ Experience_any_abuse_or_neglect: data.Experience_any_abuse_or_neglect }],
      },
      {
        questionNo: 12,
        question: "What school or institution issued your high school diploma/GED?",
        answer: [{ Institution_Name: data.Institution_Name, Institution_City: data.Institution_City, Institution_State: data.Institution_State, Year_of_graduation: data.Year_of_graduation, Type_of_degree: data.Type_of_degree }],
      },
      {
        questionNo: 13,
        question: "Did you attend a college/university?",
        answer: [allUniversity],
      },
      {
        questionNo: 14,
        question: "Have you earned any job-relevant certificates?",
        answer: [{ Job_relevant_certificates: data.Job_relevant_certificates, Specify_type_of_certificate: data.Specify_type_of_certificate, Earned_Year: data.Earned_Year }],
      },
      {
        questionNo: 15,
        question: "Please describe your current position of employment.",
        answer: [{ Place_of_employment: data.Place_of_employment, Job_Title: data.Job_Title, Location: data.Location, Timeline: data.Timeline, Duties: data.Duties, Reprimanded: data.Reprimanded }],
      },
      {
        questionNo: 16,
        question: "Please describe your previous 2 positions of employment.",
        answer: [
          {
            Place_of_employment_One: data.Place_of_employment_One,
            Job_Title_One: data.Job_Title_One,
            Location_One: data.Location_One,
            Timeline_One: data.Timeline_One,
            Duties_One: data.Duties_One,
            Reprimanded_One: data.Reprimanded_One,
            Place_of_employment_Second: data.Place_of_employment_One,
            Job_Title_Second: data.Job_Title_Second,
            Location_Second: data.Location_Second,
            Timeline_Second: data.Timeline_Second,
            Duties_Second: data.Duties_Second,
            Reprimanded_Second: data.Reprimanded_Second,
          },
        ],
      },
      {
        questionNo: 17,
        question: "Have you served in the military?",
        answer: [
          {
            Served_military: data.Served_military,
            Current_status: data.Current_status,
            Deployed: data.Deployed,
            Deployed_Location: data.Deployed_Location,
            Deployed_Timeline: data.Deployed_Timeline,
            Combat: data.Combat,
            military_related_traumatic_experiences: data.military_related_traumatic_experiences,
            Disciplinary_actions: data.Disciplinary_actions,
          },
        ],
      },
      {
        questionNo: 18,
        question: "Please list any job-relevant volunteer experience?",
        answer: [{ Job_relevant_Experience: data.Job_relevant_Experience }],
      },
      {
        questionNo: 19,
        question: "What is your current living situation?",
        answer: [{ living_City_State: data.living_City_State, Who_do_you_live_with: data.Who_do_you_live_with }],
      },
      {
        questionNo: 20,
        question: "What is your current relationship status?",
        answer: [
          {
            Relationship_Status: data.Relationship_Status,
            How_long_have_you_been_in_this_relationship: data.How_long_have_you_been_in_this_relationship,
            ...multipleMarriageTimeline,
            How_long_have_you_been_together: data.How_long_have_you_been_together,
            How_long_have_you_been_married: data.How_long_have_you_been_married,
            Timeline_of_the_marriage: data.Timeline_of_the_marriage,
            Timeline_of_previous_relationships: data.Timeline_of_previous_relationships,
            Timeline_of_current_relationship: data.Timeline_of_current_relationship,
          },
        ],
      },
      {
        questionNo: 21,
        question: "Do you have any children?",
        answer: [{ Children: data.Children, ...multipleChildData }],
      },
      {
        questionNo: 22,
        question: "Do you have any history of alcohol use?",
        answer: [{ Alcohol: data.Alcohol, Times: data.Times, Drinks_per_time: data.Drinks_per_time }],
      },
      {
        questionNo: 23,
        question: "Do you have any history of alcohol-related issues/concerns (i.e. dependence, problem drinking, legal issues, relationship issues related to your drinking)?",
        answer: [{ Alcohol_related_issues: data.Alcohol_related_issues }],
      },
      {
        questionNo: 24,
        question: "Have you ever used drugs/illicit substances?",
        answer: [{ Drugs_illicit: data.Drugs_illicit, Timeline_of_use: data.Timeline_of_use, Type_of_drug: data.Type_of_drug, Drugs_Frequency: data.Drugs_Frequency, Alcohol_Add: data.Alcohol_Add, Used_Drag: data.Used_Drag }],
      },
      {
        questionNo: 25,
        question: "Do you have any history of drug-related issues/concerns?",
        answer: [{ Drug_related_issues: data.Drug_related_issues }],
      },
      {
        questionNo: 26,
        question: "Do you have any history of mental health symptoms or diagnoses (i.e., anxiety, depression, PTSD, ADHD)?",
        answer: [{ Health_symptoms: data.Health_symptoms, Specify_Symptoms: data.Specify_Symptoms, Timeline_of_experienced_symptoms: data.Timeline_of_experienced_symptoms, Drug_related_add: data.Drug_related_add }],
      },
      {
        questionNo: 27,
        question: "Have you ever attended counseling or psychotherapy services?",
        answer: [{ Psychotherapy_services: data.Psychotherapy_services, Dates_of_attendance: data.Dates_of_attendance, Number_of_sessions: data.Number_of_sessions, Number_of_sessions: data.Range_of_this_service }],
      },
      {
        questionNo: 28,
        question: "Have you ever been prescribed medication for psychiatric purposes?",
        answer: [
          {
            Psychiatric_purposes: data.Psychiatric_purposes,
            Type_of_medication: data.Type_of_medication,
            Reason_for_prescription: data.Reason_for_prescription,
            Dosage: data.Dosage,
            When_did_you_take_the_medication: data.When_did_you_take_the_medication,
            Psychiatric_purposes_add: data.Psychiatric_purposes_add,
          },
        ],
      },
      {
        questionNo: 29,
        question: "Have you ever been hospitalized for a psychiatric reason?",
        answer: [
          {
            Psychiatric_reason: data.Psychiatric_reason,
            Reason_short_answer: data.Reason_short_answer,
            Psychiatric_reason_Timeline: data.Psychiatric_reason_Timeline,
            Psychiatric_reason_Location: data.Psychiatric_reason_Location,
            Psychiatric_reason_Name_of_hospital: data.Psychiatric_reason_Name_of_hospital,
            Psychiatric_reason_add: data.Psychiatric_reason_add,
          },
        ],
      },
      {
        questionNo: 30,
        question: "Have you ever experienced thoughts about suicide?",
        answer: [{ Thoughts_about_suicide: data.Thoughts_about_suicide }],
      },
      {
        questionNo: 31,
        question: "Have you ever engaged in self-harm behaviors (i.e., cutting or hitting yourself)?",
        answer: [{ Self_harm_behaviors: data.Self_harm_behaviors }],
      },
      {
        questionNo: 32,
        question: "Have you ever experienced thoughts about seriously harming someone else?",
        answer: [{ Harming_someone_else: data.Harming_someone_else }],
      },
      {
        questionNo: 33,
        question: "Have you ever experienced auditory/visual hallucinations?",
        answer: [{ Visual_hallucination: data.Visual_hallucination }],
      },
      {
        questionNo: 34,
        question: "Have you ever experienced paranoid thinking or delusional thoughts?",
        answer: [{ Delusional_Thoughts: data.Delusional_Thoughts }],
      },
      {
        questionNo: 35,
        question: "Have you ever been knocked unconscious following an accident, an assault, or any kind of injury?",
        answer: [
          {
            Unconscious_accident: data.Unconscious_accident,
            Experience_Prolonged_Symptoms: data.Experience_Prolonged_Symptoms,
            Experience_Prolonged_Symptoms_sort_answer: data.Experience_Prolonged_Symptoms_sort_answer,
            How_long_did_you_lose_consciousness_for: data.How_long_did_you_lose_consciousness_for,
            Unconscious_accident_Year: data.Unconscious_accident_Year,
          },
        ],
      },
      {
        questionNo: 36,
        question: "Have you ever experienced significant financial- or credit-related difficulties (i.e., being sent to collections, bankruptcy, foreclosure)?",
        answer: [{ Credit_related_difficulties: data.Credit_related_difficulties, Credit_related_difficulties_timeline: data.Credit_related_difficulties_timeline, Credit_related_difficulties_Explain: data.Credit_related_difficulties_Explain }],
      },
      {
        questionNo: 37,
        question: "Have you ever been fined/charged with a serious traffic violation?",
        answer: [{ Traffic_violation: data.Traffic_violation, Traffic_violation_Explain: data.Traffic_violation_Explain, Traffic_violation_date: data.Traffic_violation_date, Traffic_violation_Add: data.Traffic_violation_Add }],
      },
      {
        questionNo: 38,
        question: "Have you ever been charged with a criminal offense?",
        answer: [
          {
            Charged_criminal_offense: data.Charged_criminal_offense,
            Charged_criminal_offense_date: data.Charged_criminal_offense_date,
            Were_you_arrested: data.Were_you_arrested,
            Charged_criminal_offense_Sort_Answer: data.Charged_criminal_offense_Sort_Answer,
            What_were_the_consequences: data.What_were_the_consequences,
          },
        ],
      },
      {
        questionNo: 39,
        question: "Please provide a list of your hobbies and interests.- short answer",
        answer: [{ Hobbies_and_interests: data.Hobbies_and_interests }],
      },
      {
        questionNo: 40,
        question: "Please list any special job-relevant skills or talents?- short answer",
        answer: [{ Job_relevant_skills: data.Job_relevant_skills }],
      },
      {
        questionNo: 41,
        question: "Please provide a brief summary of the last time you were stressed. -short answer",
        answer: [{ Stressed: data.Stressed }],
      },
      {
        questionNo: 42,
        question: "How do you typically cope with stress? -short answer",
        answer: [{ Cope_with_stress: data.Cope_with_stress }],
      },
      {
        questionNo: 43,
        question: "Please provide a brief summary of the last time you were particularly angry. -short answer",
        answer: [{ Particularly_angry: data.Particularly_angry }],
      },
      {
        questionNo: 44,
        question: "How do you typically cope with anger? -short answer",
        answer: [{ cope_with_anger: data.cope_with_anger }],
      },
      {
        questionNo: 45,
        question: "Please provide a brief summary related to the last time you faced adversity. -short answer",
        answer: [{ faced_adversity: data.faced_adversity }],
      },
      {
        questionNo: 46,
        question: "How do you typically cope with adversity? -short answer",
        answer: [{ with_adversity: data.with_adversity }],
      },
      {
        questionNo: 47,
        question: "What are your short-term goals? -short answer",
        answer: [{ short_term_goals: data.short_term_goals }],
      },
      {
        questionNo: 48,
        question: "What are your short-term goals? -short answer",
        answer: [{ long_term_goals: data.long_term_goals }],
      },
    ];

    axios
      .post(
        "https://questionary-website.onrender.com/questions",
        { questionAnswer: answer, email: atuhUser?.email },
        {
          headers: {
            authorization: `Barer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        alert("Data Posted Successfully!");
        navigate(`/thanks/${res?.data?.data?._id}`);
      });
  };

  if (authLoading || loading) {
    return <Loading />;
  }

  if (errors) {
    console.log(errors);
  }

  if (!atuhUser?.uid) {
    return navigate("/");
  }

  const Biological_Parents = watch("Biological_Parents");
  const attendUniversity = watch("Attend_University");
  const Associate = watch("Associate");
  const Job_relevant_certificates = watch("Job_relevant_certificates");
  const Served_military = watch("Served_military");
  const Current_status = watch("Current_status");
  const Deployed = watch("Deployed");
  const Relationship_Status = watch("Relationship_Status");
  const Children = watch("Children");
  const Alcohol = watch("Alcohol");
  const Drugs_illicit = watch("Drugs_illicit");
  const Health_symptoms = watch("Health_symptoms");
  const Psychotherapy_services = watch("Psychotherapy_services");
  const Psychiatric_purposes = watch("Psychiatric_purposes");
  const Psychiatric_reason = watch("Psychiatric_reason");
  const Unconscious_accident = watch("Unconscious_accident");
  const Experience_Prolonged_Symptoms = watch("Experience_Prolonged_Symptoms");
  const Credit_related_difficulties = watch("Credit_related_difficulties");
  const Traffic_violation = watch("Traffic_violation");
  const Charged_criminal_offense = watch("Charged_criminal_offense");
  const Siblings = watch("Siblings");
  const Additional_Option_psychiatric_purposes = watch("Additional_Option_psychiatric_purposes");
  const Do_you_have_any_previous_marriages = watch("Do_you_have_any_previous_marriages");
  const Number_Of_Siblings = watch("Number_Of_Siblings");
  const Other_Address_checkbox = watch("Other_Address_checkbox");
  const Additional_Option_Type_of_drug = watch("Additional_Option_Type_of_drug");

  let previousMarriagesTimeline = [];
  for (let i = 1; i <= preMarriageTimeline; i++) {
    previousMarriagesTimeline.push(<input {...register(`Previous_marriages_Timeline${i}`)} type="text" className="form-control" placeholder="Timeline" />);
  }

  /// Multiple siblings
  let siblingsArray = [];
  for (let i = 1; i <= Number_Of_Siblings; i++) {
    siblingsArray.push(
      <div className="d-flex justify-content-between gap-2">
        <select className="form-select my-2" {...register(`Siblings${i}`)} aria-label="Default select example">
          <option>Select Option</option>
          {siblings.map((position, index) => (
            <option value={position} key={index}>
              {position}
            </option>
          ))}
        </select>
        <select className="form-select my-2" {...register(`YoungerOrOlder${i}`)} aria-label="Default select example">
          <option>Select Option</option>
          <option value="older">Older</option>
          <option value="younger">Younger</option>
        </select>
      </div>
    );
  }

  // Multiple University
  let university = [];
  for (let i = 1; i <= numberOfUniversity; i++) {
    university.push(
      <div className="d-flex justify-content-around gap-3 mt-3">
        <input {...register(`Attend_University_Name_${i}`)} type="text" className="form-control" placeholder="Institution name" />
        <input {...register(`Attend_University_Location_City_${i}`)} type="text" className="form-control" placeholder="Location of institution City" />
        <input {...register(`Attend_University_Location_State_${i}`)} type="text" className="form-control" placeholder="State or Country" />
        <input {...register(`Year_of_Graduation_${i}`)} type="text" className="form-control" placeholder="Year of graduation" />
        <select className="form-select" {...register(`Associate_${i}`)} aria-label="Default select example">
          <option>Degree</option>
          <option value="No degree">No degree</option>
          <option value="Associate’s">Associate’s</option>
          <option value="Bachelor’s">Bachelor’s</option>
          <option value="Master’s">Master’s</option>
          <option value="Doctorate degree">Doctorate Degree</option>
        </select>

        {Associate === "Associate’s" && <input {...register(`Specify_${i}`)} type="text" className="form-control mt-2" placeholder="Specify Major/Specify Minor_" />}
        {Associate === "Bachelor’s" && <input {...register(`Specify_${i}`)} type="text" className="form-control mt-2" placeholder="Specify Major/Specify Minor" />}

        {Associate === "Doctorate" && <input {...register(`Specify_${i}`)} type="text" className="form-control mt-2" placeholder="Specify Major" />}
        {Associate === "Master’s" && <input {...register(`Specify_${i}`)} type="text" className="form-control mt-2" placeholder="Specify Major" />}
      </div>
    );
  }

  // multiple children's
  let multipleChildrenS = [];

  for (let i = 1; i <= numberOfChildren; i++) {
    multipleChildrenS.push(
      <div>
        <select {...register(`Son_Or_Daughter_${i}`)} className="form-select mt-2" aria-label="Default select example">
          <option>Select Option</option>
          <option value="son">Son</option>
          <option value="daughter">Daughter</option>
        </select>
        <select {...register(`Children_Type_${i}`)} className="form-select mt-2" aria-label="Default select example">
          <option>Select Option</option>
          <option value="Biological">Biological</option>
          <option value="Step">Step</option>
          <option value="Adopted">Adopted</option>
        </select>
        <input {...register(`Children_Age_${i}`)} type="number" className="form-control mt-2" placeholder="Age" />
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="my-5">Questions</h1>

      <form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
        <h6 className="form-label my-3">1. What is your legal name?</h6>
        <div className="d-flex gap-4">
          <input {...register("First_Name", { required: true, maxLength: 80 })} type="text" className="form-control" placeholder="First Name" />
          <input {...register("Last_Name", { required: true, maxLength: 80 })} type="text" className="form-control" placeholder="Last Name" />
        </div>

        <div className="d-flex gap-4">
          <div className="w-100">
            <h6 className="form-label my-3">2. What is your date of birth?</h6>
            <div className="d-flex gap-2">
              <input {...register("Date_Of_Birth", { required: true })} type="date" className="form-control" placeholder="First Name" />
            </div>
          </div>

          {/* gender */}
          <div className="w-100">
            <h6 className="form-label my-3">3. Please identify your gender?</h6>
            <div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" {...register("Gender", { required: true })} type="radio" htmlFor="inlineRadio1" value="Male" />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  Male
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" {...register("Gender", { required: true })} type="radio" value="Female" />
                <label className="form-check-label">Female</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" {...register("Gender", { required: true })} type="radio" value="Non-binary" />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  Non-binary
                </label>
              </div>
            </div>
          </div>
          {/* gender */}
        </div>

        <div>
          <h6 className="form-label my-3">4. Which department are you being evaluated for (i.e., specific police department, sheriff's office, dispatch center, fire department, corrections facility, etc.)?</h6>
          <input type="text" className="form-control" {...register("Department", { required: true })} placeholder="Department" />
        </div>

        <div>
          <h6 className="form-label my-3">5. What position are you applying for?</h6>
          <select {...register("Position", { required: true })} className="form-select" onChange={(e) => setPosition(e.target.value)} aria-label="Default select example">
            <option>Select position</option>
            {applyingPosition.map((position, index) => (
              <option value={position} key={index}>
                {position}
              </option>
            ))}
          </select>
          {position === "Other" && (
            <div>
              <h6 className="form-label my-3">i. Please specify -(short answer)</h6>
              <input {...register("Other_Option", { required: true })} type="text" className="form-control" placeholder="Answer" />
            </div>
          )}
        </div>

        {/* for the first page */}

        {/* question 6 */}
        <div>
          <h6 className="form-label my-3">6. Where did you grow-up?</h6>
          <div className="d-flex justify-content-around gap-3">
            <input {...register("City", { required: true })} type="text" className="form-control" placeholder="City" />
            <input {...register("State", { required: true })} type="text" className="form-control" placeholder="State or Country" />
            <input {...register("Ages", { required: true })} type="text" className="form-control" placeholder="From (e.g., birth)" />
          </div>

          <div className="col-12 mt-2">
            <div className="form-check">
              <input {...register("Other_Address_checkbox", { required: false })} className="form-check-input" type="checkbox" value="" />
              <label className="form-check-label" htmlFor="invalidCheck">
                Add
              </label>
            </div>
          </div>
          {Other_Address_checkbox && <input {...register("Other_Address")} type="text" className="form-control" placeholder="New city, state/country" />}
        </div>

        <div>
          <h6 className="form-label my-3">7. Are your biological parents married to each other?</h6>
          <select {...register("Biological_Parents", { required: true })} className="form-select mb-2" aria-label="Default select example">
            <option>Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          {Biological_Parents === "no" && (
            <select {...register("Biological_Parents_Status", { required: true })} className="form-select" onChange={(e) => setBiologicalParentsStatus(e.target.value)} aria-label="Default select example">
              <option>Select Option</option>
              <option value="separated">Separated</option>
              <option value="Divorced">Divorced</option>
              <option value="NeverMarried">Never Married</option>
              <option value="Deceased">Deceased</option>
            </select>
          )}
          {biologicalParentsStatus === "Deceased" && (
            <div>
              <div className="form-check form-check-inline mt-2">
                <input {...register("Deceased", { required: true })} className="form-check-input" type="radio" name="inlineRadioOptions" value="option1" />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  Father
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input {...register("Deceased", { required: true })} className="form-check-input" type="radio" name="inlineRadioOptions" value="option2" />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  Mother
                </label>
              </div>
              <input {...register("Deceased_Year", { required: true })} type="text" className="form-control" placeholder="Year" />
            </div>
          )}
        </div>

        {/* question 8 */}
        <div>
          <h6 className="form-label my-3">8. How many siblings do you have?</h6>

          <select {...register("Number_Of_Siblings", { required: true })} className="form-select" aria-label="Default select example">
            <option>Select Option</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
          </select>
          {siblingsArray}

          {/* <button type="button" onClick={addSiblings} className="btn btn-success">
            +Add
          </button> */}
        </div>

        {/* question 9 */}
        <div className="w-100">
          <h6 className="form-label my-3">9. Who was in your household while you were growing up?</h6>
          <div className="d-flex gap-2">
            <input {...register("Growing_Up", { required: true, maxLength: 80 })} type="text" className="form-control" placeholder="Short Answer" />
          </div>
        </div>

        {/* question 10 */}
        <div className="w-100">
          <h6 className="form-label my-3">10. Did your family ever go without basic needs?</h6>
          <select {...register("Basic_Needs", { required: true })} className="form-select" aria-label="Default select example">
            <option>Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        {/* question 11 */}
        <div className="w-100">
          <h6 className="form-label my-3">11. Did you experience any abuse or neglect in your childhood?</h6>
          <select {...register("Experience_any_abuse_or_neglect", { required: true })} className="form-select" aria-label="Default select example">
            <option>Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* question 12 */}
        <div>
          <h6 className="form-label my-3">12. What school or institution issued your high school diploma/GED?</h6>
          <div className="d-flex justify-content-around gap-3">
            <input {...register("Institution_Name", { required: false })} type="text" className="form-control" placeholder="Institution name" />
            <input {...register("Institution_City", { required: false })} type="text" className="form-control" placeholder="City" />
            <input {...register("Institution_State", { required: false })} type="text" className="form-control" placeholder="State" />
            <input {...register("Year_of_graduation", { required: false })} type="text" className="form-control" placeholder="Year of graduation" />

            <select {...register("Type_of_degree", { required: false })} className="form-select" aria-label="Default select example">
              <option>Type of degree</option>
              <option value="High School Diploma">High School Diploma</option>
              <option value="GED">GED</option>
            </select>
          </div>
        </div>

        {/* question 13 start */}
        <div className="w-100">
          <h6 className="form-label my-3">13. Did you attend a college/university?</h6>
          <select {...register("Attend_University", { required: true })} className="form-select" aria-label="Default select example">
            <option>Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          {attendUniversity === "yes" && (
            <div>
              {/* coming from the loop */}
              {university}
              <button type="button" onClick={() => setNumberOfUniversity(numberOfUniversity + 1)} className="btn btn-success  mt-2">
                + Add
              </button>
              <button type="button" onClick={() => setNumberOfUniversity(numberOfUniversity - 1)} className="btn btn-danger mt-2">
                Remove
              </button>
            </div>
          )}
        </div>

        {/* question 14 */}

        <div>
          <h6 className="form-label my-3">14. Have you earned any job-relevant certificates?</h6>
          <div className="d-flex justify-content-around gap-3">
            <select className="form-select" {...register("Job_relevant_certificates", { required: true })} aria-label="Default select example">
              <option>Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {Job_relevant_certificates === "yes" && (
            <div className="d-flex gap-3">
              <input type="text" {...register("Specify_type_of_certificate", { required: true })} className="form-control mt-2" placeholder="Specify type of certificate" />
              <input type="text" {...register("Earned_Year", { required: true })} className="form-control mt-2" placeholder="Date earned - Year" />
            </div>
          )}
        </div>

        {/* question 15 */}
        <div>
          <h6 className="form-label my-3">15. Please describe your current position of employment.</h6>
          <div className="d-flex justify-content-around gap-3">
            <input {...register("Place_of_employment", { required: false })} type="text" className="form-control" placeholder="Place of employment" />
            <input {...register("Job_Title", { required: false })} type="text" className="form-control" placeholder="Job_Title" />
            <input {...register("Location", { required: false })} type="text" className="form-control" placeholder="Location" />
            <input {...register("Timeline", { required: false })} type="text" className="form-control" placeholder="Timeline" />
            <input {...register("Duties", { required: false })} type="text" className="form-control" placeholder="Duties" />
          </div>
          <div>
            <h6 className="form-label my-3">- Were you ever reprimanded?</h6>
            <select className="form-select" {...register("Reprimanded", { required: false })} aria-label="Default select example">
              <option>Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        {/* question 16 */}

        <div>
          <h6 className="form-label my-3">16. Please describe your previous 2 positions of employment.</h6>
          <h6>✦ 1</h6>
          <div className="d-flex justify-content-around gap-3">
            <input {...register("Place_of_employment_One", { required: false })} type="text" className="form-control" placeholder="Place of employment" />
            <input {...register("Job_Title_One", { required: false })} type="text" className="form-control" placeholder="Job_Title" />
            <input {...register("Location_One", { required: false })} type="text" className="form-control" placeholder="Location" />
            <input {...register("Timeline_One", { required: false })} type="text" className="form-control" placeholder="Timeline" />
            <input {...register("Duties_One", { required: false })} type="text" className="form-control" placeholder="Duties" />
          </div>
          <div>
            <h6 className="form-label my-3"> - Were you ever reprimanded?</h6>
            <select className="form-select" {...register("Reprimanded_One", { required: false })} aria-label="Default select example">
              <option>Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <h6 className="my-2">✦ 2</h6>

          <div className="d-flex justify-content-around gap-3">
            <input {...register("Place_of_employment_Second", { required: false })} type="text" className="form-control" placeholder="Place of employment" />
            <input {...register("Job_Title_Second", { required: false })} type="text" className="form-control" placeholder="Job_Title" />
            <input {...register("Location_Second", { required: false })} type="text" className="form-control" placeholder="Location" />
            <input {...register("Timeline_Second", { required: false })} type="text" className="form-control" placeholder="Timeline" />
            <input {...register("Duties_Second", { required: false })} type="text" className="form-control" placeholder="Duties" />
          </div>
          <div>
            <h6 className="form-label my-3">- Were you ever reprimanded?</h6>
            <select className="form-select" {...register("Reprimanded_Second", { required: false })} aria-label="Default select example">
              <option>Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        {/* question 17 */}

        <div className="w-100">
          <h6 className="form-label my-3">17. Have you served in the military?</h6>
          <select {...register("Served_military", { required: true })} className="form-select" aria-label="Default select example">
            <option>Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          {Served_military === "yes" && (
            <div className="d-flex justify-content-around gap-3">
              <div>
                <p>I. Branch</p>
                <select {...register("Military_Branch", { required: true })} className="form-select" aria-label="Default select example">
                  <option>Branch</option>
                  {militaryBranch.map((b) => (
                    <option value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div>
                <p>II. Rank</p>
                <input {...register("Military_Rank", { required: false })} type="text" className="form-control" placeholder="Sort answer" />
              </div>

              <div>
                <p>III. Current Status</p>
                <select {...register("Current_status", { required: true })} className="form-select" aria-label="Default select example">
                  <option>Branch</option>
                  <option value="Active">Active</option>
                  <option value="Reserve">Reserve</option>
                  <option value="Discharged">Discharged_discharge_status</option>
                </select>
              </div>

              {Current_status === "Discharged" && (
                <select {...register("Current_status", { required: true })} className="form-select" aria-label="Default select example">
                  <option>Branch</option>
                  <option value="Honorable">Honorable</option>
                  <option value="General, Under Honorable Conditions">General, Under Honorable Conditions</option>
                  <option value="Under Other than Honorable Conditions">Under Other than Honorable Conditions</option>
                  <option value="Bad Conduct">Bad Conduct</option>
                  <option value="Dishonorable">Dishonorable</option>
                </select>
              )}

              <div>
                <p>IV. Were you ever deployed?</p>
                <select {...register("Deployed", { required: true })} className="form-select" aria-label="Default select example">
                  <option>Select Option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {Deployed === "yes" && (
                <div>
                  <input {...register("Deployed_Location", { required: false })} type="text" className="form-control" placeholder="Location" />
                  <input {...register("Deployed_Timeline", { required: false })} type="text" className="form-control" placeholder="Timeline" />
                  <input {...register("Extra_field", { required: false })} type="text" className="form-control" placeholder="Add+" />
                </div>
              )}

              <div>
                <p>V. Were you ever deployed?</p>
                <select {...register("Combat", { required: true })} className="form-select" aria-label="Default select example">
                  <option>Select Option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div>
                <p>VI. Did you experience any military-related traumatic experiences?</p>
                <select {...register("military_related_traumatic_experiences", { required: true })} className="form-select" aria-label="Default select example">
                  <option>Select Option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div>
                <p>VII. Do you have a history of formal military-related disciplinary actions?</p>
                <select {...register("Disciplinary_actions", { required: true })} className="form-select" aria-label="Default select example">
                  <option>Select Option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* question 18 */}

        <div>
          <h6 className="form-label my-3">18. Please list any job-relevant volunteer experience?</h6>
          <div className="d-flex gap-4">
            <input {...register("Job_relevant_Experience", { required: true, maxLength: 80 })} type="text" className="form-control" placeholder="Job Relevant Experience" />
          </div>
        </div>

        {/* question 19 */}

        <div>
          <h6 className="form-label my-3">19. What is your current living situation?</h6>
          <div className="d-flex gap-4">
            <input {...register("living_City_State", { required: true, maxLength: 80 })} type="text" className="form-control" placeholder="City and State" />
            <input {...register("Who_do_you_live_with", { required: true, maxLength: 80 })} type="text" className="form-control" placeholder="Who_do_you_live_with?" />
          </div>
        </div>

        {/* question 20 */}

        <div>
          <h6 className="form-label my-3">20. What is your current relationship status?</h6>
          <select {...register("Relationship_Status", { required: true })} className="form-select" aria-label="Default select example">
            <option>Select Option</option>
            <option value="Single">Single</option>
            <option value="In a relationship">In a relationship</option>
            <option value="Engaged">Engaged</option>
            <option value="Married">Married</option>
            <option value="Divorced/single">Divorced/single</option>
          </select>

          {Relationship_Status === "In a relationship" && (
            <div>
              <h6 className="form-label my-3">i. How long have you been in this relationship?</h6>
              <input {...register("How_long_have_you_been_in_this_relationship", { required: true, maxLength: 80 })} type="text" className="form-control" placeholder="Answer" />
            </div>
          )}
          {Relationship_Status === "Engaged" && (
            <div>
              <h6 className="form-label my-3">i. How long have you been in this relationship?</h6>
              <input {...register("How_long_have_you_been_in_this_relationship", { required: true, maxLength: 80 })} type="text" className="form-control" placeholder="Answer" />
            </div>
          )}
          {Relationship_Status === "Married" && (
            <div>
              <h6 className="form-label my-3">I. How long have you been married?</h6>
              <input {...register("How_long_have_you_been_married", { required: false })} type="text" className="form-control" placeholder="Answer" />
              <h6 className="form-label my-3">II. How long have you been together?</h6>
              <input {...register("How_long_have_you_been_together", { required: false })} type="text" className="form-control" placeholder="Answer" />

              <h6 className="form-label my-3">III. Do you have any previous marriages?</h6>
              <div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" {...register("Do_you_have_any_previous_marriages", { required: true })} type="radio" htmlFor="inlineRadio1" value="yes" />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    Yes
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" {...register("Do_you_have_any_previous_marriages", { required: true })} type="radio" value="no" />
                  <label className="form-check-label">No</label>
                </div>
              </div>
            </div>
          )}

          {Do_you_have_any_previous_marriages === "yes" && (
            <div>
              {previousMarriagesTimeline}
              <button type="button" className="btn btn-success mt-2" onClick={() => setPreMarriageTimeline(preMarriageTimeline + 1)}>
                +Add
              </button>
              <button type="button" className="btn btn-danger mt-2" onClick={() => setPreMarriageTimeline(preMarriageTimeline - 1)}>
                Remove
              </button>
            </div>
          )}

          {Relationship_Status === "Divorced/single" && (
            <div>
              <h6 className="form-label my-3">I. Timeline of current relationship</h6>
              <input {...register("Timeline_of_current_relationship", { required: true })} type="text" className="form-control" placeholder="Answer" />
              <h6 className="form-label my-3">II. Timeline of previous relationships</h6>
              <input {...register("Timeline_of_previous_relationships", { required: true })} type="text" className="form-control" placeholder="Answer" />
            </div>
          )}
        </div>

        {/* questions 21 */}

        <div>
          <h6 className="form-label my-3">21. Do you have any children?</h6>
          <select {...register("Children", { required: true })} className="form-select" aria-label="Default select example">
            <option>Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {Children === "yes" && (
            <div>
              {multipleChildrenS}
              <button type="button" className="btn btn-success mt-2" onClick={() => setNumberOfChildren(numberOfChildren + 1)}>
                +Add
              </button>
              <button type="button" className="btn btn-danger mt-2" onClick={() => setNumberOfChildren(numberOfChildren - 1)}>
                Remove
              </button>
            </div>
          )}
        </div>
        {/* questions 22 */}
        <div>
          <h6 className="form-label my-3">22. Do you drink alcohol?</h6>
          <select {...register("Alcohol", { required: true })} className="form-select" aria-label="Default select example">
            <option>Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          {Alcohol === "yes" && (
            <div>
              <h6 className="form-label my-3">I. How often and how much do you currently drink?</h6>
              <input {...register("Times", { required: true })} type="text" className="form-control" placeholder="Times (1,2,3,4,5,,,,10) per (Week, Month, Year)" />
              <input {...register("Drinks_per_time", { required: true })} type="text" className="form-control mt-2" placeholder="Drinks per time (1,2,3,4,,,20)" />
            </div>
          )}
        </div>
        {/* questions 23 */}
        <div>
          <h6 className="form-label my-3">23. Do you have any history of alcohol-related issues/concerns (i.e. dependence, problem drinking, legal issues, relationship issues related to your drinking)?</h6>
          <select {...register("Alcohol_related_issues", { required: true })} className="form-select" aria-label="Default select example">
            <option>Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* questions 24 */}

        <div>
          <h6 className="form-label my-3">24. Have you ever used drugs/illicit substances?</h6>
          <select {...register("Used_Drag", { required: true })} className="form-select" aria-label="Default select example">
            <option>Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <div className="col-12 mt-2">
            <div className="form-check">
              <input {...register("Drugs_illicit", { required: false })} className="form-check-input" type="checkbox" value="" />
              <label className="form-check-label" htmlFor="invalidCheck">
                Additional Option
              </label>
            </div>
          </div>
          {Drugs_illicit && (
            <div>
              <h6 className="form-label my-3">Frequency (daily, monthly, yearly)</h6>
              <select {...register("Drugs_Frequency", { required: true })} className="form-select" aria-label="Default select example">
                <option>Select Option</option>
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="I don’t use it anymore">I don’t use it anymore</option>
              </select>

              <h6 className="form-label my-3">I. Type of drug.</h6>

              <input {...register("Type_of_drug", { required: false })} type="text" className="form-control" placeholder="Times (1,2,3,4,5,,,,10) per (Week, Month, Year)" />
              <h6 className="form-label my-3">II. Timeline of use</h6>
              <input {...register("Timeline_of_use", { required: false })} type="text" className="form-control mt-2" placeholder="Timeline of use" />

              {/* <h6 className="form-label my-3">III. +Add</h6> */}
              <div className="col-12 mt-2">
                <div className="form-check">
                  <input {...register("Additional_Option_Type_of_drug", { required: false })} className="form-check-input" type="checkbox" value="" />
                  <label className="form-check-label" htmlFor="invalidCheck">
                    +Add
                  </label>
                </div>
              </div>
              {Additional_Option_Type_of_drug && <input {...register("Alcohol_Add", { required: false })} type="text" className="form-control mt-2" placeholder="Additional Option" />}
            </div>
          )}
        </div>

        {/* questions 25 */}
        <div>
          <h6 className="form-label my-3">25. Do you have any history of drug-related issues/concerns?</h6>
          <select {...register("Drug_related_issues", { required: true })} className="form-select" aria-label="Default select example">
            <option>Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* questions 26 */}

        <div>
          <h6 className="form-label my-3">26. Do you have any history of mental health symptoms or diagnoses (i.e., anxiety, depression, PTSD, ADHD)?</h6>
          <select {...register("Health_symptoms", { required: true })} className="form-select" aria-label="Default select example">
            <option>Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          {Health_symptoms === "yes" && (
            <div>
              <h6 className="form-label my-3">I. Specify Symptoms</h6>
              <input {...register("Specify_Symptoms", { required: true })} type="text" className="form-control" placeholder="Specify Symptoms" />
              <h6 className="form-label my-3">II. Timeline of experienced symptoms.</h6>
              <input {...register("Timeline_of_experienced_symptoms", { required: true })} type="text" className="form-control mt-2" placeholder="Timeline of use" />
              <h6 className="form-label my-3">III. +Add</h6>
              <input {...register("Drug_related_add", { required: true })} type="text" className="form-control mt-2" placeholder="Timeline of use" />
            </div>
          )}
        </div>

        {/* questions 27 */}

        <div>
          <h6 className="form-label my-3">27. Have you ever attended counseling or psychotherapy services?</h6>
          <select {...register("Psychotherapy_services", { required: true })} className="form-select" aria-label="Default select example">
            <option>Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          {Psychotherapy_services === "yes" && (
            <div>
              <h6 className="form-label my-3">I. Dates of attendance</h6>
              <input {...register("Dates_of_attendance", { required: true })} type="date" className="form-control" placeholder="Dates of attendance" />
              <h6 className="form-label my-3">II. Number of sessions </h6>
              <input {...register("Number_of_sessions", { required: true })} type="text" className="form-control mt-2" placeholder="Approximate number of sessions attended" />
              <h6 className="form-label my-3">III. Range of this service </h6>
              <input {...register("Range_of_this_service", { required: true })} type="text" className="form-control mt-2" placeholder="Range of this service" />
            </div>
          )}
        </div>

        {/* questions 28 */}

        <div>
          <h6 className="form-label my-3">28. Have you ever been prescribed medication for psychiatric purposes?</h6>
          <select {...register("Psychiatric_purposes", { required: true })} className="form-select" aria-label="Default select example">
            <option>Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          <div className="col-12 mt-2">
            <div className="form-check">
              <input {...register("Additional_Option_psychiatric_purposes", { required: false })} className="form-check-input" type="checkbox" value="" />
              <label className="form-check-label" htmlFor="invalidCheck">
                Additional Option
              </label>
            </div>
          </div>

          {Additional_Option_psychiatric_purposes && (
            <div>
              <h6 className="form-label my-3">I. Type of medication</h6>
              <input {...register("Type_of_medication", { required: true })} type="text" className="form-control" placeholder="Type of medication" />
              <h6 className="form-label my-3">II. Reason for prescription </h6>
              <input {...register("Reason_for_prescription", { required: true })} type="text" className="form-control mt-2" placeholder="e.g., depression, anxiety, etc" />
              <h6 className="form-label my-3">III. Dosage </h6>
              <input {...register("Dosage", { required: true })} type="text" className="form-control mt-2" placeholder="Reason for prescription" />
              <h6 className="form-label my-3">IV. When did you take the medication? </h6>
              <input {...register("When_did_you_take_the_medication", { required: true })} type="text" className="form-control mt-2" placeholder="Timeline of use" />
              <h6 className="form-label my-3">V. +Add </h6>
              <input {...register("Psychiatric_purposes_add", { required: true })} type="text" className="form-control mt-2" placeholder="Timeline of use" />
            </div>
          )}
        </div>

        {/* questions 29 */}

        <div>
          <h6 className="form-label my-3">29. Have you ever been hospitalized for a psychiatric reason?</h6>
          <select {...register("Psychiatric_reason", { required: true })} className="form-select" aria-label="Default select example">
            <option>Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          {Psychiatric_reason === "yes" && (
            <div>
              <h6 className="form-label my-3">I. Reason- short answer</h6>
              <input {...register("Reason_short_answer", { required: true })} type="text" className="form-control" placeholder="Answer" />
              <h6 className="form-label my-3">II. Timeline </h6>
              <input {...register("Psychiatric_reason_Timeline", { required: true })} type="text" className="form-control mt-2" placeholder="Timeline" />
              <h6 className="form-label my-3">III. Location </h6>
              <input {...register("Psychiatric_reason_Location", { required: true })} type="text" className="form-control mt-2" placeholder="Location" />
              <h6 className="form-label my-3">IV. When did you take the medication? </h6>
              <input {...register("Psychiatric_reason_Name_of_hospital", { required: true })} type="text" className="form-control mt-2" placeholder="Psychiatric reason Name of hospital" />
              <h6 className="form-label my-3">V. +Add </h6>
              <input {...register("Psychiatric_reason_add", { required: false })} type="text" className="form-control mt-2" placeholder="+Add" />
            </div>
          )}
        </div>

        {/* questions 30 */}

        <div>
          <h6 className="form-label my-3">30. Have you ever experienced thoughts about suicide?</h6>
          <select {...register("Thoughts_about_suicide", { required: true })} className="form-select" aria-label="Default select example">
            <option>Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        {/* questions 31 */}

        <div>
          <h6 className="form-label my-3">31. Have you ever engaged in self-harm behaviors (i.e., cutting or hitting yourself)?</h6>
          <select {...register("Self_harm_behaviors", { required: true })} className="form-select" aria-label="Default select example">
            <option>Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* questions 32 */}
        <div>
          <h6 className="form-label my-3">32. Have you ever experienced thoughts about seriously harming someone else?</h6>
          <select {...register("Harming_someone_else", { required: true })} className="form-select" aria-label="Default select example">
            <option>Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* questions 33 */}
        <div>
          <h6 className="form-label my-3">33. Have you ever experienced auditory/visual hallucinations?</h6>
          <select {...register("Visual_hallucination", { required: true })} className="form-select" aria-label="Default select example">
            <option>Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* questions 34 */}
        <div>
          <h6 className="form-label my-3">34. Have you ever experienced paranoid thinking or delusional thoughts?</h6>
          <select {...register("Delusional_Thoughts", { required: true })} className="form-select" aria-label="Default select example">
            <option>Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* questions 35 */}

        <div>
          <h6 className="form-label my-3">35.Have you ever been knocked unconscious following an accident, an assault, or any kind of injury?</h6>
          <select {...register("Unconscious_accident", { required: true })} className="form-select" aria-label="Default select example">
            <option>Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          {Unconscious_accident === "yes" && (
            <div>
              <h6 className="form-label my-3">I. When - year</h6>
              <input {...register("Unconscious_accident_Year", { required: true })} type="date" className="form-control" placeholder="Dates of attendance" />
              <h6 className="form-label my-3">II. How long did you lose consciousness for? </h6>
              <input {...register("How_long_did_you_lose_consciousness_for", { required: true })} type="text" className="form-control mt-2" placeholder="Timeline of use" />
              <h6 className="form-label my-3">III. Following the injury, did you experience prolonged symptoms (i.e., headaches, dizziness, depression) or functional issues (i.e., attention, memory, employment, relationship)? </h6>
              <select {...register("Experience_Prolonged_Symptoms", { required: true })} className="form-select" aria-label="Default select example">
                <option>Select Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>

              {Experience_Prolonged_Symptoms === "yes" && <input {...register("Experience_Prolonged_Symptoms_sort_answer", { required: true })} type="text" className="form-control mt-2" placeholder="Sort answer" />}
            </div>
          )}
        </div>

        {/* questions 36 */}

        <div>
          <h6 className="form-label my-3">36.Have you ever experienced significant financial- or credit-related difficulties (i.e., being sent to collections, bankruptcy, foreclosure)?</h6>
          <select {...register("Credit_related_difficulties", { required: true })} className="form-select" aria-label="Default select example">
            <option>Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          {Credit_related_difficulties === "yes" && (
            <div>
              <h6 className="form-label my-3">I. Explain- short answer</h6>
              <input {...register("Credit_related_difficulties_Explain", { required: true })} type="text" className="form-control" placeholder="" />
              <h6 className="form-label my-3">II. Timeline </h6>
              <input {...register("Credit_related_difficulties_timeline", { required: true })} type="text" className="form-control mt-2" placeholder="" />
            </div>
          )}
        </div>

        {/* questions 37 */}
        <div>
          <h6 className="form-label my-3">37. Have you ever been fined/charged with a serious traffic violation?</h6>
          <select {...register("Traffic_violation", { required: true })} className="form-select" aria-label="Default select example">
            <option>Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          {Traffic_violation === "yes" && (
            <div>
              <h6 className="form-label my-3">I. Explain - short answer</h6>
              <input {...register("Traffic_violation_Explain", { required: true })} type="text" className="form-control" placeholder="" />
              <h6 className="form-label my-3">II. Date </h6>
              <input {...register("Traffic_violation_date", { required: true })} type="text" className="form-control mt-2" placeholder="" />
              <h6 className="form-label my-3">II. +Add </h6>
              <input {...register("Traffic_violation_Add", { required: true })} type="text" className="form-control mt-2" placeholder="Add" />
            </div>
          )}
        </div>

        {/* questions 38 */}
        <div>
          <h6 className="form-label my-3">38. Have you ever been charged with a criminal offense?</h6>
          <select {...register("Charged_criminal_offense", { required: true })} className="form-select" aria-label="Default select example">
            <option>Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          {Charged_criminal_offense === "yes" && (
            <div>
              <h6 className="form-label my-3">I. Date</h6>
              <input {...register("Charged_criminal_offense_date", { required: true })} type="text" className="form-control" placeholder="Charged_criminal_offense_date" />

              <h6 className="form-label my-3">II. Were you arrested?</h6>
              <select {...register("Were_you_arrested", { required: true })} className="form-select" aria-label="Default select example">
                <option>Select Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>

              <h6 className="form-label my-3">III. Please outline the charge(s)- short answer</h6>
              <input {...register("Charged_criminal_offense_Sort_Answer", { required: true })} type="text" className="form-control mt-2" placeholder="Sort Answer" />

              <h6 className="form-label my-3">II. What were the consequences? </h6>
              <input {...register("What_were_the_consequences", { required: true })} type="date" className="form-control mt-2" placeholder="Short answer" />
            </div>
          )}
        </div>

        {/* questions 39 */}
        <div>
          <h6 className="form-label my-3">39. Please provide a list of your hobbies and interests.- short answer</h6>
          <input {...register("Hobbies_and_interests", { required: true })} type="text" className="form-control" placeholder="Short Answer" />
        </div>

        {/* questions 40 */}
        <div>
          <h6 className="form-label my-3">40. Please list any special job-relevant skills or talents?- short answer</h6>
          <input {...register("Job_relevant_skills", { required: true })} type="text" className="form-control" placeholder="Short Answer" />
        </div>

        {/* questions 41 */}
        <div>
          <h6 className="form-label my-3">41. Please provide a brief summary of the last time you were stressed. - short answer</h6>
          <input {...register("Stressed", { required: true })} type="text" className="form-control" placeholder="Short Answer" />
        </div>

        {/* questions 42 */}
        <div>
          <h6 className="form-label my-3">42. How do you typically cope with stress? -short answer</h6>
          <input {...register("Cope_with_stress", { required: true })} type="text" className="form-control" placeholder="Short Answer" />
        </div>

        {/* questions 43 */}
        <div>
          <h6 className="form-label my-3">43. Please provide a brief summary of the last time you were particularly angry. -short answer</h6>
          <input {...register("Particularly_angry", { required: true })} type="text" className="form-control" placeholder="Short Answer" />
        </div>

        {/* questions 44 */}
        <div>
          <h6 className="form-label my-3">44. How do you typically cope with anger? -short answer</h6>
          <input {...register("cope_with_anger", { required: true })} type="text" className="form-control" placeholder="Short Answer" />
        </div>
        {/* questions 45 */}
        <div>
          <h6 className="form-label my-3">45. Please provide a brief summary related to the last time you faced adversity. -short answer</h6>
          <input {...register("faced_adversity", { required: true })} type="text" className="form-control" placeholder="Short Answer" />
        </div>

        {/* questions 46 */}
        <div>
          <h6 className="form-label my-3">46. How do you typically cope with adversity? -short answer</h6>
          <input {...register("with_adversity", { required: true })} type="text" className="form-control" placeholder="Short Answer" />
        </div>

        {/* questions 47 */}
        <div>
          <h6 className="form-label my-3">47. What are your short-term goals? -short answer</h6>
          <input {...register("short_term_goals", { required: true })} type="text" className="form-control" placeholder="Short Answer" />
        </div>

        {/* questions 48 */}
        <div>
          <h6 className="form-label my-3">48. What are your long-term goals? -short answer</h6>
          <input {...register("long_term_goals", { required: true })} type="text" className="form-control" placeholder="Short Answer" />
          {errors.long_term_goals && <p className="text-danger">This is required</p>}
        </div>

        <input type="submit" className="btn btn-primary my-3" value="submit" />
      </form>
    </div>
  );
};

export default Questions;
