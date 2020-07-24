import React from "react";
import "./home.css";
import Menu from "../menu";
import Base from "./base";

const Home = () => {
  return (
    <div>

      <Menu />

      <div className="todos">
        <p>Welcome to your Todos!!</p>
        <p>Here you can save your day-to-day task.</p>
        <p>
          You only need a simple signup so that
          <p>you can see your saved task</p>
          anytime anywhere.
        </p>
        <p>Let set go!!!</p>
      </div>
      <Base />
    </div>
  );
};
export default Home;
