import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import style from "../styles/Form.module.css";

type Inputs = {
  example: string;
  exampleRequired: string;
};

export default function reactform() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    alert(JSON.stringify(data));
  }; // your form submit function which will invoke after successful validation

  console.log(watch("example")); // you can watch individual input by pass the name of the input

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className={style.aaa}>Example</label>
      <input {...register("example")} defaultValue="test" />
      <label>ExampleRequired</label>
      <input
        {...register("exampleRequired", { required: true, maxLength: 10 })}
      />
      {errors.exampleRequired && <p>This field is required</p>}
      <input type="submit" />
    </form>
  );
}