"use client"

import { useEffect, useState } from 'react';
import * as Workout from "@/api";
import styles from "./calendar.module.css";

interface Day {
    date: number,
    month: number,
    year: number,
    curDate: boolean,
    curMonth: boolean,
    status: "success" | "fail" | "default",
}

interface Props {
    date: Date,
}

const Calendar = (props: Props) => {
    const months: string[] = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const weekDays: string[] = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

    const [curDate, setCurDate] = useState<Date>(props.date);
    const [curMonth, setCurMonth] = useState<Date>(new Date(curDate.getFullYear(), curDate.getMonth(), 1)); //selectedMonth
    const [days, setDays] = useState<Day[]>(new Array<Day>(42));
    
    // const handleWorkouts = async () => {
	// 	const result  = await Workout.workout.workouts({
	// 		begin: `${getFirstDay()}-${curDate.getMonth}`,
	// 		end: `${getLastDay()}-${curMonth.getMonth()-1} `
	// 	});

	// 	if (!("message" in result)){
	// 		localStorage.setItem("token", result.token);
	// 		setIsAuthorized(true);

	// 		displayLoginMessage("Successfully logged in", true);
	// 		router.push("/");
	// 	}
	// 	else {
	// 		handleLoginError(result.status);
	// 	}
 	// };

    const getFirstDay = () => {
        const day: Date = new Date(curMonth.getFullYear(), curMonth.getMonth(), 0);
        day.setDate(day.getDate() - day.getDay() + 1);
        return day;
    }

    const getLastDay = () => {
        const day: Date = new Date(curMonth.getFullYear(), curMonth.getMonth() + 1, 0);
        day.setDate(42 - (((curMonth.getDay() - 1) + 7) % 7 + day.getDate()));
        return day;
    }

    const partOfPreviousMonth = () => {
        const days: Day[] = new Array<Day>();

        const day: Date = new Date(curMonth.getFullYear(), curMonth.getMonth(), 0);
        const firstDay = getFirstDay().getDate();
        const lastDay = day.getDate();

        for (let i = firstDay; i <= lastDay; i++) {
            days.push({
                date: i,
                month: day.getMonth(),
                year: day.getFullYear(),
                curDate: i === curDate.getDate() && day.getMonth() === curDate.getMonth() && day.getFullYear() === curDate.getFullYear(),
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
                date: i,
                month: day.getMonth(),
                year: day.getFullYear(),
                curDate: i === curDate.getDate() && day.getMonth() === curDate.getMonth() && day.getFullYear() === curDate.getFullYear(),
                curMonth: true,
                status: "default",
            })
        }

        return days;
    }

    const partOfNextMonth = () => {
        const days: Day[] = new Array<Day>();

        const day: Date = new Date(curMonth.getFullYear(), curMonth.getMonth() + 1, 0);
        const lastDay = getLastDay().getDate();

        for (let i = 1; i <= lastDay; i++) {
            days.push({
                date: i,
                month: day.getMonth(),
                year: day.getFullYear(),
                curDate: i === curDate.getDate() && day.getMonth() === curDate.getMonth() && day.getFullYear() === curDate.getFullYear(),
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
                    &lt;
                </button>
                
                <div className={styles.calendar__main}>
                    <div className={styles.calendar__header}>
                        {`${months[curMonth.getMonth()]}, ${curMonth.getFullYear()}`}
                    </div>

                    <div className={styles.calendar__body}>
                        {weekDays.map((weekDay, index) => {
                            return (
                                <div
                                    key={index}
                                    className={styles.weekDays}
                                >
                                    {weekDay}
                                </div>
                            )
                        })}
                        
                        {days.map((day, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`${styles.day} ` +
                                    `${day.curDate ? styles.today : ""} ` +
                                    `${day.curMonth ? "" : styles.dayOutside} ` +
                                    `${day.status === "success" ? styles.daySuccess : ""} ` +
                                    `${day.status === "fail" ? styles.daySuccess : ""}`}
                                >
                                    {day.date}
                                </div>
                            )
                        })}
                    </div>
                </div>

                <button className={styles.calendar__button} onClick={() => (setCurMonth(new Date(curMonth.getFullYear(), curMonth.getMonth() + 1, curMonth.getDate())))}>
                    &gt;
                </button>
            </div>
        </div>
    )
}

export default Calendar;