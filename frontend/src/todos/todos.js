import React, { useState, useEffect } from "react";
import "../todos/todos.css";
import Menu from "../menu";
import { createTodos, getTodos,deleteTodos } from "./todoshelper";
import { isAuthenticated } from "../user/userhelper";
import { Link } from "react-router-dom";

const Todos = () => {
  const [values, setValues] = useState({
    name: "",
    error: "",
    todos: [],
  });

  const { name, error, todos } = values;

  const { user, token } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });

    createTodos(user._id, token, { name })
      .then((data) => {
        if (data?.error) {
          return setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, name: "", error: "" });
        }
      })
      .catch((err) => console.log(err));
  };

  const preload = () => {
    getTodos(user._id, token).then((data) => {
      if (data?.error) {
        setValues({ ...values, error: data.error });
      } else {
        console.log(data);
        setValues({ ...values, name: "", todos: data });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteTodo = todoId => {
    deleteTodos(todoId,user._id,token).then(data => {
      if(data?.error){
        console.log(data.error)
      }else{
        preload()
      }
    })
  }

  return (
    <div>
      <Menu />
      <div className="contain">
        <p className="txt lead text-large">MyTodos</p>
        <input type="text" className="inp" onChange={handleChange("name")} />
        <br />
        <button className="bt" onClick={onSubmit}>
          Submit
        </button>
        <div className="row">
          {todos.map((todos, index) => {
            return (
              <div key={index} className="row text-center mb-2 all">
                <div className="col-4">
                  <h3 className="text-info txte">
                    <input type="checkbox"/>
                     {todos.name}
                  </h3>
                </div>
                
                <div className="col-4">
                  <button className="btn btn-danger buttn" onClick={() => {deleteTodo(todos._id)}}>
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Todos;
