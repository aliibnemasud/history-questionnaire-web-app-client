import React, { useState } from "react";
import { applyingPosition, siblings } from "./data";

const Questions = () => {
  const [position, setPosition] = useState("");
  const [biologicalParents, setBiologicalParents] = useState("");
  const [biologicalParentsStatus, setBiologicalParentsStatus] = useState("");
  const [attendUniversity, setAttendUniversity] = useState("");
  const [associate, setAssociate] = useState("");
  const [earnedCertificates, setEarnedCertificates] = useState("");

  console.log(position);

  return (
    <div className="container">
      <h1>Questions</h1>

      <div class="mb-3">
        <h6 for="exampleFormControlInput1" class="form-label my-3">
          1. What is your legal name?
        </h6>
        <div className="d-flex gap-4">
          <input type="text" className="form-control" placeholder="First Name" />
          <input type="text" className="form-control" placeholder="First Name" />
        </div>

        <div className="d-flex gap-4">
          <div className="w-100">
            <h6 for="exampleFormControlInput1" class="form-label my-3">
              2. What is your date of birth?
            </h6>
            <div className="d-flex gap-2">
              <input type="date" className="form-control" placeholder="First Name" />
            </div>
          </div>

          {/* gender */}
          <div className="w-100">
            <h6 for="exampleFormControlInput1" class="form-label my-3">
              3. Please identify your gender?
            </h6>
            <div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                <label class="form-check-label" for="inlineRadio1">
                  Male
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                <label class="form-check-label" for="inlineRadio2">
                  Female
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                <label class="form-check-label" for="inlineRadio2">
                  Non-binary
                </label>
              </div>
            </div>
          </div>
          {/* gender */}
        </div>

        <div>
          <h6 for="exampleFormControlInput1" class="form-label my-3">
            4. Which department are you being evaluated for (i.e., specific police department, sheriff's office, dispatch center, fire department, corrections facility, etc.)?
          </h6>
          <input type="text" className="form-control" placeholder="First Name" />
        </div>

        <div>
          <h6 for="exampleFormControlInput1" class="form-label my-3">
            5. What position are you applying for?
          </h6>
          <select className="form-select" onChange={(e) => setPosition(e.target.value)} aria-label="Default select example">
            <option selected>Select position</option>
            {applyingPosition.map((position) => (
              <option value={position}>{position}</option>
            ))}
          </select>
          {position === "Other" && (
            <div>
              <h6 for="exampleFormControlInput1" class="form-label my-3">
                i. Please specify -(short answer)
              </h6>
              <input type="text" className="form-control" placeholder="Answer" />
            </div>
          )}
        </div>

        <div>
          <h6 for="exampleFormControlInput1" class="form-label my-3">
            6. Where did you grow-up?
          </h6>
          <div className="d-flex justify-content-around gap-3">
            <input type="text" className="form-control" placeholder="City" />
            <input type="text" className="form-control" placeholder="State" />
            <input type="text" className="form-control" placeholder="Ages/Timeline" />
          </div>
        </div>

        <div>
          <h6 for="exampleFormControlInput1" class="form-label my-3">
            7. Are your biological parents married to each other?
          </h6>
          <select className="form-select mb-2" onChange={(e) => setBiologicalParents(e.target.value)} aria-label="Default select example">
            <option selected>Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {biologicalParents === "no" && (
            <select className="form-select" onChange={(e) => setBiologicalParentsStatus(e.target.value)} aria-label="Default select example">
              <option selected>Select Option</option>
              <option value="separated">Separated</option>
              <option value="Divorced">Divorced</option>
              <option value="NeverMarried">Never Married</option>
              <option value="Deceased">Deceased</option>
            </select>
          )}
          {biologicalParentsStatus === "Deceased" && (
            <div>
              <div class="form-check form-check-inline mt-2">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                <label class="form-check-label" for="inlineRadio1">
                  Father
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                <label class="form-check-label" for="inlineRadio2">
                  Mother
                </label>
              </div>
              <input type="text" className="form-control" placeholder="Year" />
            </div>
          )}
        </div>

        {/* question 8 */}
        <div>
          <h6 for="exampleFormControlInput1" class="form-label my-3">
            8. How many siblings do you have?
          </h6>
          <select className="form-select" onChange={(e) => setPosition(e.target.value)} aria-label="Default select example">
            <option selected>Select position</option>
            {siblings.map((position) => (
              <option value={position}>{position}</option>
            ))}
          </select>
        </div>

        {/* question 9 */}
        <div className="w-100">
          <h6 for="exampleFormControlInput1" class="form-label my-3">
            9. Who was in your household while you were growing up?
          </h6>
          <div className="d-flex gap-2">
            <input type="text" className="form-control" placeholder="Short Answer" />
          </div>
        </div>

        {/* question 10 */}
        <div className="w-100">
          <h6 for="exampleFormControlInput1" class="form-label my-3">
            10. WDid your family ever go without basic needs?
          </h6>
          <select className="form-select" aria-label="Default select example">
            <option selected>Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        {/* question 11 */}
        <div className="w-100">
          <h6 for="exampleFormControlInput1" class="form-label my-3">
            11. Did you experience any abuse or neglect in your childhood?
          </h6>
          <select className="form-select" aria-label="Default select example">
            <option selected>Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* question 12 */}

        <div>
          <h6 for="exampleFormControlInput1" class="form-label my-3">
            12. What school or institution issued your high school diploma/GED?
          </h6>
          <div className="d-flex justify-content-around gap-3">
            <input type="text" className="form-control" placeholder="Institution name" />
            <input type="text" className="form-control" placeholder="Location of institution- City, State" />
            <input type="text" className="form-control" placeholder="Year of graduation" />

            <select className="form-select" aria-label="Default select example">
              <option selected>Type of degree</option>
              <option value="High School Diploma">High School Diploma</option>
              <option value="GED">GED</option>
            </select>
          </div>
        </div>

        {/* question 13 */}
        <div className="w-100">
          <h6 for="exampleFormControlInput1" class="form-label my-3">
            13. Did you attend a college/university?
          </h6>
          <select onChange={(e) => setAttendUniversity(e.target.value)} className="form-select" aria-label="Default select example">
            <option selected>Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          {attendUniversity === "yes" && (
            <div className="d-flex justify-content-around gap-3 mt-3">
              <input type="text" className="form-control" placeholder="Institution name" />
              <input type="text" className="form-control" placeholder="Location of institution- City, State" />
              <input type="text" className="form-control" placeholder="Year of graduation" />
              <select className="form-select" onChange={(e)=> setAssociate(e.target.value) } aria-label="Default select example">
                <option selected>Degree</option>
                <option value="No degree">No degree</option>
                <option value="Associate’s">Associate’s</option>
                <option value="Bachelor’s">Bachelor’s</option>
                <option value="Master’s">Master’s</option>                
              </select>

              </div>
          )}
              {associate === "Associate’s" &&
                <input type="text" className="form-control mt-2" placeholder="Specify Major/Specify Minor" />
              }
              {associate === "Bachelor’s" &&
                <input type="text" className="form-control mt-2" placeholder="Specify Major/Specify Minor" />
              }

              {associate === "Doctorate" &&
                <input type="text" className="form-control mt-2" placeholder="Specify Major" />
              }
              {associate === "Master’s" &&
                <input type="text" className="form-control mt-2" placeholder="Specify Major" />
              }           
        </div>

        {/* question 14 */}

        <div>
          <h6 class="form-label my-3">
            12. Have you earned any job-relevant certificates?
          </h6>
          <div className="d-flex justify-content-around gap-3">
            <select className="form-select" onChange={(e)=> setEarnedCertificates(e.target.value)} aria-label="Default select example">
              <option selected>Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            {
              earnedCertificates === 'yes' && <div>
                <input type="text" className="form-control mt-2" placeholder="Specify type of certificate" />
                <input type="text" className="form-control mt-2" placeholder="Date earned - Year" />
              </div>
            }
          </div>
        </div>

        {/* question 15 */}
        <div>
          <h6 class="form-label my-3">
            12. Please describe your current position of employment.
          </h6>
          <div className="d-flex justify-content-around gap-3">
            <select className="form-select" onChange={(e)=> setEarnedCertificates(e.target.value)} aria-label="Default select example">
              <option selected>Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            {
              earnedCertificates === 'yes' && <div>
                <input type="text" className="form-control mt-2" placeholder="Specify type of certificate" />
                <input type="text" className="form-control mt-2" placeholder="Date earned - Year" />
              </div>
            }
          </div>
        </div>


      </div>
    </div>
  );
};

export default Questions;
