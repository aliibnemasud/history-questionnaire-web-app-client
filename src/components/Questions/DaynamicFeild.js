import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { siblings } from "./data";

const DaynamicFeild = () => {

  const { register, handleSubmit, watch } = useForm();
  const [fields, setFields] = useState([{ id: 1, value: "" }]);

  const onSubmit = (data) => {
    console.log(data);
  };

  console.log('field', fields)

  const addField = () => {
    setFields([...fields, { id: fields?.length + 1, value: "" }]);
  };

  const removeField = (id) => {
    setFields(fields?.filter((field) => field.id !== id));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields?.map((field, index) => (
        <div key={field.id}>
          <select className="form-select my-2" {...register(`Siblings${index}`, { required: true })} aria-label="Default select example">
          <option defaultValue>Select Option</option>
          {siblings?.map((position, idx) => (
            <option value={position} key={idx}>
              {position}
            </option>
          ))}
        </select>
          <button type="button" onClick={() => removeField(field.id)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => addField()}>
        Add Field
      </button>
      <input type="submit" />
    </form>
  );
}


export default DaynamicFeild;
