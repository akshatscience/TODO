import React, { useState } from "react";
import "./style.css";
import { getLogin, isAuthenticated, authenticate } from "./userhelper";
import { Redirect } from "react-router-dom";
import Menu from "../menu";
import Base from "./base";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    didRedirect: false,
  });

  const { email, password, error, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    getLogin({ email, password })
      .then((data) => {
        if (data?.error) {
          setValues({ ...values, error: data.error });
        } else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true });
          });
        }
      })
      .catch(console.log("login failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      return <Redirect to="/login/todos" />;
    }
  };
   const fail = () => {
     return(
       <div className="alert alert-danger"
       style={{ display: error ? "" : "none" }}>
       Invalid Password

       </div>
     )
   }

  return (
    <div>
      <Menu />
      <div className="signin">
        <h3>Login Here!!</h3>
        <form>
          <label className="label-name">Email</label>
          <br />
          <input
            type="email"
            className="input"
            onChange={handleChange("email")}
          />
          <br />
          <label className="label-name">Password</label>
          <br />
          <input
            type="password"
            className="input"
            onChange={handleChange("password")}
          />
          <br />
          <button className="button" onClick={onSubmit}>
            Login
          </button>
          {fail()}
          {performRedirect()}
        </form>
      </div>
      <Base />
    </div>
  );
};
export default Login;
