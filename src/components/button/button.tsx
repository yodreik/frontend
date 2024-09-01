"use client";

import styles from "./button.module.css";
import "../../styles/fonts.css";
import PropTypes from "prop-types";

// TODO: Pass a color for button through a props, perfectly from globals.css
interface Props {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
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

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
