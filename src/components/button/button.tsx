'use client'

import styles from './button.module.css';
import { useState } from 'react';

interface Props {
  onClick: () => void,
  disabled: boolean,
  text: string,
}

const Button = (props: Props) => {
  const [isPressed, setIsPressed] = useState<boolean>();

  const handleMouseDown = () => {
    setIsPressed(true);
  }

  const handleMouseUp = () => {
    setIsPressed(false);
  }

  return (
    <button
      className={styles.button + " " + (isPressed ? styles.buttonPressed : "")}
      disabled={props.disabled}
      onClick={props.onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {props.text}
    </button>
  );
}

export default Button;