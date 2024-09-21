"use client"

import { useEffect, useState } from 'react';
import * as Workout from "@/api";
import styles from "./BarCalendar.module.css";

interface Props {
    date: Date,
}

interface Day {
    date?: Date,
    isToday?: boolean,
    isSelectedMonth?: boolean,
    workouts: Workout[],
}

interface Workout {
    date?: Date,
    duration: number,
    kind?: string,
}

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

const BarCalendar = (props: Props) => {
    const today = props.date;

    const [selectedMonth, setSelectedMonth] = useState<Date>(new Date(today.getFullYear(), today.getMonth()));

    const [workouts, setWorkouts] = useState<Workout[]>([]);;

    const [togglePosition, setTogglePosition] = useState<0 | 1 | 2 | 3>(0);

    const handleActivity = async () => {
        const firstDay = getFirstCalendarDay();
        const lastDay = getLastCalendarDay();

        const firstDateDay = String(firstDay.getDate()).padStart(2, '0')
        const firstDateMonth = String(firstDay.getMonth() + 1).padStart(2, '0');
        const lastDateDay = String(lastDay.getDate()).padStart(2, '0');
        const lastDateMonth = String(lastDay.getMonth() + 1).padStart(2, '0');

		const result  = await Workout.workout.activity({
			begin: `${firstDateDay}-${firstDateMonth}-${firstDay.getFullYear()}`,
			end: `${lastDateDay}-${lastDateMonth}-${lastDay.getFullYear()}`,
		});

		if (!("message" in result)){
            const newWorkouts: Workout[] = [];
            result.workouts.forEach(workout => {
                workouts.push({
                    date: parseDate(workout.date),
                    duration: workout.duration,
                    kind: workout.kind,
                });
            });
            setWorkouts(newWorkouts);
		}
		else {
			console.log(result.message);
		}
 	};

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

    const parseDate = (dateString: string) => {
        const parts: string[] = dateString.split('-');
        const day: number = parseInt(parts[0], 10);
        const month: number = parseInt(parts[1], 10) - 1;
        const year: number = parseInt(parts[2], 10);

        return new Date(year, month, day);
    }

    const [days, setDays] = useState<Day[]>([{workouts: [{duration: 50}]}, 
        {workouts: [{duration: 120}]}, 
        {workouts: [{duration: 30}, {duration: 50}]}, 
        {workouts: [{duration: 31}]},
        {workouts: [{duration: 0}]},
        {workouts: [{duration: 70}, {duration: 30}]},
        {workouts: [{duration: 120}]},]);

    return (
        <div className={styles.barCalendar}>
            <div className={styles.header}>

            </div>

            <div className={styles.body}>
                <div className={styles.graph}>
                    <div className={styles.bars}>
                        {days.map((day, index) => {
                            return (
                                <div
                                    key={index}
                                    className={styles.barContainer}
                                >
                                    {day.workouts.map((workout, index) => {
                                        return (
                                            <div
                                                key={index}
                                                style={{ height: `${workout.duration / 120 * 100}%` }}
                                                className={`${styles.bar} ${index !== 0 && styles.extraBar}`}
                                            />
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                    
                    <div className={styles.time} style={{ bottom: "84px" }}>01:30</div>
                    <div className={styles.time} style={{ bottom: "54px" }}>01:00</div>
                    <div className={styles.time} style={{ bottom: "24px" }}>00:30</div>
                    <hr className={styles.backgroundLine} style={{ bottom: "90px" }}/>
                    <hr className={styles.backgroundLine} style={{ bottom: "60px" }}/>
                    <hr className={styles.backgroundLine} style={{ bottom: "30px" }}/>
                    <hr className={styles.bottomLine}/>
                </div>


                <div className={styles.timeDesignations}>
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
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.toggle_container}>
                    <div className={styles.toggle_button} onClick={() => {setTogglePosition(0)}}>Week</div>
                    <div className={styles.toggle_button} onClick={() => {setTogglePosition(1)}}>Month</div>
                    <div className={styles.toggle_button} onClick={() => {setTogglePosition(2)}}>Year</div>
                    <div className={styles.toggle_button} onClick={() => {setTogglePosition(3)}}>All time</div>
                    
                    <div className={`${styles.active_toggle_button} ${togglePosition === 1 && styles.position1} ${togglePosition === 2 && styles.position2} ${togglePosition === 3 && styles.position3}`}>
                        <div className={`${styles.active_titles_container} ${togglePosition === 1 && styles.position1} ${togglePosition === 2 && styles.position2} ${togglePosition === 3 && styles.position3}`}>
                            <div className={styles.active_toggle_title}>Week</div>
                            <div className={styles.active_toggle_title}>Month</div>
                            <div className={styles.active_toggle_title}>Year</div>
                            <div className={styles.active_toggle_title}>All time</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BarCalendar;