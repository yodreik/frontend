"use client";

import styles from "./button.module.css";
import "../../styles/fonts.css";
import { ReactNode } from "react";

// TODO: Pass a color for button through a props, perfectly from globals.css
interface Props {
  label: string;
  onClick: () => void;
  disabled: boolean;
}

const Button = (props: Props) => {
  return (
    <button
      className={styles.button}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
};
export default Button;
