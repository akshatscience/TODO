import React, { useState } from "react";
import "./signup.css";
import { Link } from "react-router-dom";
import { getSignup } from "./userhelper";
import Menu from "../menu";
import Base from "./base";

const App = () => {
  const [values, setVaules] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handeChange = (name) => (event) => {
    setVaules({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setVaules({ ...values, error: false });
    getSignup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setVaules({ ...values, error: data.error, success: false });
        } else {
          setVaules({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("signingUp failed"));
  };

  return (
    <div>
      <Menu />
      <div>
        <div className="signup">
          <h3>SignUp Here!</h3>
          <form>
            <label className="label-name">Name</label>
            <br></br>
            <input
              type="text"
              className="input-box"
              onChange={handeChange("name")}
              value={name}
            />
            <br />
            <label className="label-name">Email</label>
            <br />
            <input
              type="email"
              className="input-box"
              onChange={handeChange("email")}
              value={email}
            />
            <br />
            <label className="label-name">Password</label>
            <br />
            <input
              type="password"
              className="input-box"
              onChange={handeChange("password")}
              value={password}
            />
            <br />
            {/* <label className="label-name">Confirm Password</label>
            <br />
            <input type="password" className="input-box" />
            <br /> */}
            <button className="button btn-info" onClick={onSubmit}>
              Signup
            </button>
            <hr></hr>
            <p className="text">
              Already have an account?
              <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
      <Base />
    </div>
  );
};

export default App;
