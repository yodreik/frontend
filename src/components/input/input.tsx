"use client";

import styles from "./input.module.css";
import "../../styles/fonts.css";
import { ChangeEvent } from "react";

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  status?: "error" | "";
  placeholder?: string;
  disabled?: boolean;
}

const Input = (props: Props) => {
  return (
    <input
      className={
        props.status === "error"
          ? `${styles.input} ${styles.inputError}`
          : `${styles.input}`
      }
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      disabled={props.disabled}
    />
  );
};

export default Input;
