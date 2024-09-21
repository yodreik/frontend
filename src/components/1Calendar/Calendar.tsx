"use client"

import { useEffect, useState } from 'react';
import * as Workout from "@/api";
import LeftArrow from '@/icons/leftArrow';
import RightArrow from '@/icons/rightArrow';
import styles from "./Calendar.module.css";

interface Props {
    date: Date,
}

interface Day {
    date: Date,
    isToday: boolean,
    isSelectedMonth: boolean,
    kind: string,
}

interface Workout {
    date: Date,
    kind: string,
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

const Calendar = (props: Props) => {
    const today = props.date;

    const [selectedDay, setSelectedDay] = useState<Date>();
    const [selectedMonth, setSelectedMonth] = useState<Date>(new Date(today.getFullYear(), today.getMonth()));

    const [workouts, setWorkouts] = useState<Workout[]>([]);
    
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

    const fillCalendar = () => {
        const days: Day[] = [];

        let workoutsIndex = 0;
        for (let day = getFirstCalendarDay(); day.getTime() <= getLastCalendarDay().getTime(); day.setDate(day.getDate() + 1)) {
            const currentDay = new Date(day);
            days.push({
                date: currentDay,
                isToday: currentDay.getTime() === new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime(),
                isSelectedMonth: currentDay.getMonth() === selectedMonth.getMonth(),
                kind: workouts[workoutsIndex] && currentDay.getTime() === workouts[workoutsIndex].date.getTime() ? workouts[workoutsIndex++].kind : "",
            })
        }

        return days;
    }

    useEffect(() => {
        handleActivity().then(() => {
            setDays(fillCalendar());
        })
    }, [selectedMonth]);

    const [days, setDays] = useState<Day[]>(fillCalendar());

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
                    
                    {days.map((day, index) => {
                        return (
                            <div
                                key={index}
                                className={`${styles.day} ` +
                                `${day.isToday ? styles.today : ""} ` +
                                `${day.isSelectedMonth ? "" : styles.dayOutside} ` +
                                `${day.kind ? styles.workout : ""}`}
                            >
                                {day.date.getDate()}
                            </div>
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