"use client"

import React, { useState } from 'react';
import styles from "./calendar.module.css";

interface Props {
    
}

const Calendar = (props: Props) => {
    const numbers: number[] = [29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <div className={styles.screen}>
            <div className={styles.calendar}>
                <button className={styles.calendar__button}>
                    Left
                </button>
                
                <div className={styles.calendar__main}>
                    <div className={styles.calendar__header}>
                        Month
                    </div>

                    <div className={styles.calendar__body}>
                        {numbers.map((nums) => (
                            <div className={styles.test}>
                                {nums}
                            </div>
                        ))}
                    </div>
                </div>

                <button className={styles.calendar__button}>
                    Right
                </button>
            </div>
        </div>
    )
}

export default Calendar;