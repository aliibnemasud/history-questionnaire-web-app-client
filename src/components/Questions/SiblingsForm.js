import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { siblings } from "./data";

const SiblingsForm = () => {
  const [siblingState, setSiblingState] = useState(1);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const [fields, setFields] = useState([{ id: 1, value: "" }]);

  const onSubmit = (data) => {
    console.log(data);
  };

  const data = {};

  let siblingsArray = [];
  for (let i = 1; i <= siblingState; i++) {
    siblingsArray.push(
      <select className="form-select my-2" {...register(`Siblings${i}`, { required: true })} aria-label="Default select example">
        <option defaultValue>Select Option</option>
        {siblings.map((position, index) => (
          <option value={position} key={index}>
            {position}
          </option>
        ))}
      </select>
    );
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {siblingsArray}
        
        <button onClick={() => setSiblingState(siblingState + 1)}>Add</button>

        <select className="form-select my-2" {...register(`hello`, { required: true })} aria-label="Default select example">
          <option defaultValue>Select Option</option>
          {siblings.map((position, index) => (
            <option value={position} key={index}>
              {position}
            </option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SiblingsForm;
