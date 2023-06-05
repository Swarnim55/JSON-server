import React from "react";
import styles from "@/styles/ToDo.module.css";
import Card from "./UI/Card";
import ToDoForm from "./ToDoForm";
import ToDoList from "./ToDoList/ToDoList";

const ToDo = () => {
  return (
    <>
      <div className={styles.main}>
        <Card>
          <ToDoForm />
        </Card>
        <br />
        <Card>
          <ToDoList />
        </Card>
      </div>
    </>
  );
};

export default ToDo;
