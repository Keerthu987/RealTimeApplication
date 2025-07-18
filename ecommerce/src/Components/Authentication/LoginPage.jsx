import React from "react";
import "./LoginPage.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../../Services/UserServices";

const schema = z.object({
  email: z
    .string()
    .email({ message: "Please Enter Valid Email Address" })
    .min(3),
  password: z
    .string()
    .min(8, { message: "Password should be atleast 8 characters" }),
});
const LoginPage = () => {
  const [formError, setFormError] = useState("");
  // let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (formData) => {
    try {
      await login(formData);
      // console.log(res);
      setFormError("");
      // localStorage.setItem("token", data.token);
      window.location = "/";
      // navigate("/");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setFormError(err.response.data.message);
      }
    }
  };
  return (
    <section className="align_center form_page">
      <form className="authentication_form" onClick={handleSubmit(onSubmit)}>
        <h2>Login Form</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="form_text_input"
              {...register("email")}
            />
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form_text_input"
              placeholder="Enter your Password"
              {...register("password")}
            />
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}
          </div>
          {formError && <em className="form_error">{formError} </em>}
          <button type="submit" className="search_button form_submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
