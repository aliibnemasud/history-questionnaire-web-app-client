import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { applyingPosition, militaryBranch, siblings } from "./data";

const Questions = () => {
  const [position, setPosition] = useState("");
  const [biologicalParents, setBiologicalParents] = useState("");
  const [biologicalParentsStatus, setBiologicalParentsStatus] = useState("");

  const [associate, setAssociate] = useState("");
  const [earnedCertificates, setEarnedCertificates] = useState("");

  // Hello
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    //console.log(data.First_Name)

    /* const answer = [{ First_Name: "Ali", Last_Name: "Ibne Masud" }];
    for (let key in answer[0]) {
      let splitedKey = key.split("_");
      let newKey = "";
      splitedKey.map((str) => {
        newKey = newKey + " " + str;
      });
      console.log(newKey + ": " + answer[0][key]);
    } */

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
        answer: [{ City: data.City, State: data.State, Ages: data.Ages, City: data.City }],
      },
      {
        questionNo: 7,
        question: "Are your biological parents married to each other?",
        answer: [{ Biological_Parents: data.Biological_Parents, Biological_Parents_Status: data.Biological_Parents_Status, Deceased: data.Ages, Deceased_Year: data.Deceased_Year }],
      },
      {
        questionNo: 8,
        question: "How many siblings do you have?",
        answer: [],
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
        question: "Did your family ever go without basic needs?",
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
        answer: [
          {
            Attend_University: data.Attend_University,
            Attend_University_Name: data.Attend_University_Name,
            Attend_University_Location_City: data.Attend_University_Location_City,
            Attend_University_Location_State: data.Attend_University_Location_State,
            Year_of_Graduation: data.Year_of_Graduation,
            Associate: data.Associate,
            Specify: data.Specify,
          },
        ],
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
        answer: [{ Served_military: data.Served_military }],
      },
    ];

    console.log(answer);
  };

  const Biological_Parents = watch("Biological_Parents");
  const attendUniversity = watch("Attend_University");
  const Associate = watch("Associate");
  const Job_relevant_certificates = watch("Job_relevant_certificates");
  const Served_military = watch("Served_military");

  // console.log(errors);

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
            <option defaultValue>Select position</option>
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

        <div>
          <h6 className="form-label my-3">6. Where did you grow-up?</h6>
          <div className="d-flex justify-content-around gap-3">
            <input {...register("City", { required: true })} type="text" className="form-control" placeholder="City" />
            <input {...register("State", { required: true })} type="text" className="form-control" placeholder="State" />
            <input {...register("Ages", { required: true })} type="text" className="form-control" placeholder="Ages/Timeline" />
          </div>
        </div>

        <div>
          <h6 className="form-label my-3">7. Are your biological parents married to each other?</h6>
          <select {...register("Biological_Parents", { required: true })} className="form-select mb-2" aria-label="Default select example">
            <option defaultValue>Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {Biological_Parents === "no" && (
            <select {...register("Biological_Parents_Status", { required: true })} className="form-select" onChange={(e) => setBiologicalParentsStatus(e.target.value)} aria-label="Default select example">
              <option defaultValue>Select Option</option>
              <option value="separated">Separated</option>
              <option value="Divorced">Divorced</option>
              <option value="NeverMarried">Never Married</option>
              <option value="Deceased">Deceased</option>
            </select>
          )}
          {biologicalParentsStatus === "Deceased" && (
            <div>
              <div className="form-check form-check-inline mt-2">
                <input {...register("Deceased", { required: true })} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  Father
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input {...register("Deceased", { required: true })} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
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
          <select className="form-select" onChange={(e) => setPosition(e.target.value)} aria-label="Default select example">
            <option defaultValue>Select position</option>
            {siblings.map((position, index) => (
              <option value={position} key={index}>
                {position}
              </option>
            ))}
          </select>
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
          <h6 className="form-label my-3">10. WDid your family ever go without basic needs?</h6>
          <select {...register("Basic_Needs", { required: true })} className="form-select" aria-label="Default select example">
            <option defaultValue>Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        {/* question 11 */}
        <div className="w-100">
          <h6 className="form-label my-3">11. Did you experience any abuse or neglect in your childhood?</h6>
          <select {...register("Experience_any_abuse_or_neglect", { required: true })} className="form-select" aria-label="Default select example">
            <option defaultValue>Select Option</option>
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
              <option defaultValue>Type of degree</option>
              <option value="High School Diploma">High School Diploma</option>
              <option value="GED">GED</option>
            </select>
          </div>
        </div>

        {/* question 13 */}
        <div className="w-100">
          <h6 className="form-label my-3">13. Did you attend a college/university?</h6>
          <select {...register("Attend_University", { required: true })} className="form-select" aria-label="Default select example">
            <option defaultValue>Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          {attendUniversity === "yes" && (
            <div className="d-flex justify-content-around gap-3 mt-3">
              <input {...register("Attend_University_Name", { required: true })} type="text" className="form-control" placeholder="Institution name" />
              <input {...register("Attend_University_Location_City", { required: true })} type="text" className="form-control" placeholder="Location of institution City" />
              <input {...register("Attend_University_Location_State", { required: true })} type="text" className="form-control" placeholder="Location of institution City" />
              <input {...register("Year_of_Graduation", { required: true })} type="text" className="form-control" placeholder="Year of graduation" />
              <select className="form-select" {...register("Associate", { required: true })} aria-label="Default select example">
                <option defaultValue>Degree</option>
                <option value="No degree">No degree</option>
                <option value="Associate’s">Associate’s</option>
                <option value="Bachelor’s">Bachelor’s</option>
                <option value="Master’s">Master’s</option>
              </select>
            </div>
          )}
          {Associate === "Associate’s" && <input {...register("Specify", { required: false })} type="text" className="form-control mt-2" placeholder="Specify Major/Specify Minor" />}
          {Associate === "Bachelor’s" && <input {...register("Specify", { required: false })} type="text" className="form-control mt-2" placeholder="Specify Major/Specify Minor" />}

          {Associate === "Doctorate" && <input {...register("Specify", { required: false })} type="text" className="form-control mt-2" placeholder="Specify Major" />}
          {Associate === "Master’s" && <input {...register("Specify", { required: false })} type="text" className="form-control mt-2" placeholder="Specify Major" />}
        </div>

        {/* question 14 */}

        <div>
          <h6 className="form-label my-3">14. Have you earned any job-relevant certificates?</h6>
          <div className="d-flex justify-content-around gap-3">
            <select className="form-select" {...register("Job_relevant_certificates", { required: true })} aria-label="Default select example">
              <option defaultValue>Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            {Job_relevant_certificates === "yes" && (
              <div>
                <input type="text" {...register("Specify_type_of_certificate", { required: true })} className="form-control mt-2" placeholder="Specify type of certificate" />
                <input type="text" {...register("Earned_Year", { required: true })} className="form-control mt-2" placeholder="Date earned - Year" />
              </div>
            )}
          </div>
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
              <option defaultValue>Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        {/* question 16 */}

        <div>
          <h6 className="form-label my-3">16. Please describe your previous 2 positions of employment.</h6>
          <p>First Employment</p>
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
              <option defaultValue>Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <p>Second Employment</p>
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
              <option defaultValue>Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        {/* question 17 */}

        <div className="w-100">
          <h6 className="form-label my-3">17. Have you served in the military?</h6>
          <select {...register("Served_military", { required: true })} className="form-select" aria-label="Default select example">
            <option defaultValue>Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          {Served_military === "yes" && (
            <div className="d-flex justify-content-around gap-3">
              <div>
              <p>I. Branch</p>
              <select {...register("Military_Branch", { required: true })} className="form-select" aria-label="Default select example">
                <option defaultValue>Branch</option>
                {
                  militaryBranch.map(b => <option value={b}>{b}</option> )
                }                
              </select>
              </div>
              <div>
              <p>II. Rank</p>
              <input {...register("Military_Rank", { required: false })} type="text" className="form-control" placeholder="Sort answer" />
              </div>

              <div>
              <p>III. Current Status</p>
              <select {...register("Current_status", { required: true })} className="form-select" aria-label="Default select example">
                <option defaultValue>Branch</option>
                <option value="Active">Active</option>               
                <option value="Reserve">Reserve</option>               
                <option value="Discharged_discharge_status">Discharged_discharge_status</option>                             
              </select>
              </div>


            </div>
          )}
        </div>

        <input type="submit" className="btn btn-primary my-3" value="submit" />
      </form>
    </div>
  );
};

export default Questions;
