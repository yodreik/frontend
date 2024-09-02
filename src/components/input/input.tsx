"use client";

import styles from "./input.module.css";
import "../../styles/fonts.css";
import { ChangeEvent } from "react";

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  status?: "error" | "default";
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
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      disabled={props.disabled}
    />
  );
};

export default Input;
