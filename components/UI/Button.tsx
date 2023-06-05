import React from "react";
import styles from "@/styles/Button.module.css";

const Button = (props: any) => {
  const classes = `${props.className} ${styles.btn}`;

  return (
    <button className={classes} type={props.type || "button"} {...props}>
      {props.children}{" "}
    </button>
  );
};

export default Button;
