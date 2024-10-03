"use client"

import { useEffect, useState } from 'react';
import DonutChart from "@/components/DonutChart/DonutChart";
import LeftArrow from '@/icons/leftArrow';
import RightArrow from '@/icons/rightArrow';
import styles from "./Calendar.module.css";

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

const weekDays: string[] = [
    "Mo", 
    "Tu", 
    "We", 
    "Th", 
    "Fr", 
    "Sa", 
    "Su"
];

interface Props {
    getActivity: (firstDay: Date, lastDay: Date) => Promise<Workout[]>,
}

interface Day {
    date: Date,
    isToday: boolean,
    isSelectedMonth: boolean,
    workouts: Workout[],
}

interface Workout {
    date: Date,
    duration: number,
    kind: string,
}



const Calendar = ({ getActivity } : Props) => {
    const today = new Date();

    const [selectedDay, setSelectedDay] = useState<Date>();
    const [selectedMonth, setSelectedMonth] = useState<Date>(new Date(today.getFullYear(), today.getMonth()));

    const getFirstCalendarDay = () => {
        const dayOfWeek = selectedMonth.getDay();
        const firstDay: Date = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), (dayOfWeek === 0) ? -5 : 2 - dayOfWeek);
        return firstDay;
    }

    const getLastCalendarDay = () => {
        const firstDay = getFirstCalendarDay();
        const lastDay: Date = new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 41);
        return lastDay;
    }

    const createCalendar = () => {
        const days = new Map<number, Day>();

        for (let day = getFirstCalendarDay(); day.getTime() <= getLastCalendarDay().getTime(); day.setDate(day.getDate() + 1)) {
            const currentDay = new Date(day);
            days.set(currentDay.getTime(),
                {
                    date: currentDay,
                    isToday: currentDay.getTime() === new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime(),
                    isSelectedMonth: currentDay.getMonth() === selectedMonth.getMonth(),
                    workouts: [],
                }
            )
        }

        return days;
    }

    const fillCalendar = (days: Map<number, Day>, workouts: Workout[]) => {

        workouts.forEach(workout => {
            days.get(workout.date.getTime())?.workouts.push(workout);
        });

        return days;
    }

    useEffect(() => {
        const calendar = createCalendar();
        const firstDay = getFirstCalendarDay();
        const lastDay = getLastCalendarDay();

        setDays(calendar);

        getActivity(firstDay, lastDay).then((workouts) => {
            if (workouts.length !== 0){
                setDays(fillCalendar(calendar, workouts));
            }
        });
    }, [selectedMonth]);

    const [days, setDays] = useState<Map<number, Day>>(createCalendar());

    return (
        <div className={styles.calendar}>
            <button className={styles.calendar__button} onClick={() => (setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1)))}>
                <LeftArrow className={styles.arrow}/>
            </button>
            
            <div className={styles.calendar__main}>
                <div className={styles.calendar__header}>
                    {`${months[selectedMonth.getMonth()]} ${selectedMonth.getFullYear()}`}
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
                    
                    {Array.from(days).map(([key, day], index) => {
                        return (
                            <DonutChart key={index} className={styles.dayContainer} parts={day.workouts.map(workout => ({value: workout.duration, color: `var(--${workout.kind})`}))}>
                                <div
                                    key={index}
                                    className={`${styles.day} ` +
                                    `${day.isToday ? styles.today : ""} ` +
                                    `${day.isSelectedMonth ? "" : styles.dayOutside}`}
                                >
                                    {day.date.getDate()}
                                </div>
                            </DonutChart>
                        )
                    })}
                </div>
            </div>

            <button className={styles.calendar__button} onClick={() => (setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1)))}>
                <RightArrow className={styles.arrow}/>
            </button>
        </div>
    )
}

export default Calendar;