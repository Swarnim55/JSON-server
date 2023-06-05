import React from "react";
import styles from "@/styles/ToDoForm.module.css";
import Button from "./UI/Button";

const ToDoForm = (props: any) => {
  const formHandler = () => {};
  return (
    <>
      <form className={styles.form} onSubmit={formHandler}>
        <label htmlFor="task"> Task: </label>
        <input type="text" id="task" />
        <label htmlFor="date"> Date: </label>
        <input type="date" id="date" />
        <label htmlFor="cat"> Category:</label>
        <select>
          <option value="">Select Category</option>
        </select>
        <label htmlFor="date"> Time: </label>
        <input type="time" id="date" />
        <Button type="submit">Add Task </Button>
      </form>
    </>
  );
};

export default ToDoForm;
