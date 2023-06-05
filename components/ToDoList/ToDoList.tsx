import React from "react";
import styles from "@/styles/ToDoList.module.css";
import Button from "../UI/Button";
import { useQuery } from "@tanstack/react-query";

const ToDoList = () => {
  return (
    <>
      <div className={styles.listShow}>
        <div className={styles.listDate}>
          <span>26</span>
          <span style={{ fontSize: "2rem" }}>June</span>
          <span>2023</span>
          <span>10:00 AM</span>
        </div>
        <div className={styles.listTask}>
          <span className={styles.task}> Task </span>
          <span className={styles.cat}> Office</span>
          <span className={styles.status}> Incomplete</span>
          <div className={styles.listActions}>
            <Button>EDIT</Button>
            <Button>DELETE</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDoList;
