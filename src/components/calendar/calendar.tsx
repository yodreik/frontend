"use client"

import { useEffect, useState } from 'react';
import styles from "./calendar.module.css";

interface Day {
    value: number,
    curMonth: boolean,
    status: "success" | "fail" | "default",
}

interface Props {
    date: Date,
}

const Calendar = (props: Props) => {
    const [curDate, setCurDate] = useState<Date>(props.date);
    const [curMonth, setCurMonth] = useState<Date>(new Date(curDate.getFullYear(), curDate.getMonth(), 1)); //selectedMonth
    const [days, setDays] = useState<Day[]>(new Array<Day>(42));
    
    const partOfPreviousMonth = () => {
        const days: Day[] = new Array<Day>();

        const day: Date = new Date(curMonth.getFullYear(), curMonth.getMonth(), 0);
        const firstDay = day.getDate() - day.getDay() + 1;
        const lastDay = day.getDate();

        for (let i = firstDay; i <= lastDay; i++) {
            days.push({
                value: i,
                curMonth: false,
                status: "default",
            })
        }

        return days;
    }

    const currentMonth = () => {
        const days: Day[] = new Array<Day>();

        const day: Date = new Date(curMonth.getFullYear(), curMonth.getMonth() + 1, 0);
        const lastDay = day.getDate();

        for (let i = 1; i <= lastDay; i++) {
            days.push({
                value: i,
                curMonth: true,
                status: "default",
            })
        }

        return days;
    }

    const partOfNextMonth = () => {
        const days: Day[] = new Array<Day>();

        const day: Date = new Date(curMonth.getFullYear(), curMonth.getMonth() + 1, 0);
        const lastDay = 42 - (((curMonth.getDay() - 1) + 7) % 7 + day.getDate());

        for (let i = 1; i <= lastDay; i++) {
            days.push({
                value: i,
                curMonth: false,
                status: "default",
            })
        }

        return days;
    }


    useEffect(() => {
        const days: Day[] = [...partOfPreviousMonth(), ...currentMonth(), ...partOfNextMonth()];
        setDays(days);
    }, [curMonth]);

    return (
        <div className={styles.screen}>
            <div className={styles.calendar}>
                <button className={styles.calendar__button} onClick={() => (setCurMonth(new Date(curMonth.getFullYear(), curMonth.getMonth() - 1, curMonth.getDate())))}>
                    Left
                </button>
                
                <div className={styles.calendar__main}>
                    <div className={styles.calendar__header}>
                        Month
                    </div>

                    <div className={styles.calendar__body}>
                        {days.map((day, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`${styles.day}
                                    ${curMonth ? "" : styles.dayOutside}`}
                                >
                                    {day.value}
                                </div>
                            )
                        })}
                    </div>
                </div>

                <button className={styles.calendar__button} onClick={() => (setCurMonth(new Date(curMonth.getFullYear(), curMonth.getMonth() + 1, curMonth.getDate())))}>
                    Right
                </button>
            </div>
        </div>
    )
}

export default Calendar;