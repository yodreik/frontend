"use client"

import { useEffect, useState } from 'react';
import styles from "./calendar.module.css";

interface Day {
    value: number,
    status: "success" | "fail" | "default",
}

interface Props {
    date: Date,
}

const Calendar = (props: Props) => {
    const curDate: Date = props.date;
    const [days, setDays] = useState<Day[]>(new Array<Day>(42).fill({ value: 0, status: "default" }));

    const month = () => {
        let date: number = curDate.getDate();
        let day: number = ((curDate.getDay() - 1) + 7) % 7;
        const daysInMonth: number = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0).getDate();
        const daysInLastMonth: number = new Date(curDate.getFullYear(), curDate.getMonth(), 0).getDate();

        const newDays: Day[] = new Array<Day>(42).fill({ value: 0, status: "default" });
        while (date > 1) {
            date--;
            day = ((day - 1) + 7) % 7;
        }

        console.log(day)
        for (let i = 0; i < 42; i++){
            if (day > 0) {
                newDays[i] = {
                    value: daysInLastMonth - day + 1,
                    status: "default",
                }
                day--;
            }
            else if (-day < daysInMonth){
                newDays[i] = {
                    value: i + newDays[0].value - daysInLastMonth,
                    status: "default",
                }
                day--;
            }
            else {
                newDays[i] = {
                    value: i + newDays[0].value - daysInLastMonth - daysInMonth,
                    status: "default",
                }
            }
        }
        setDays(newDays);
    };

    return (
        <div className={styles.screen}>
            <div className={styles.calendar}>
                <button className={styles.calendar__button} onClick={month}>
                    Left
                </button>
                
                <div className={styles.calendar__main}>
                    <div className={styles.calendar__header}>
                        Month
                    </div>

                    <div className={styles.calendar__body}>
                        {days.map((day, index) => {
                            return(
                                <div key={index} className={styles.test}>
                                    {day.value}
                                </div>
                            )
                        })}
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