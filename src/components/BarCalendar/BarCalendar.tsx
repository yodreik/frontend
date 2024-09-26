"use client"

import { useEffect, useState } from 'react';
import * as Workout from "@/api";
import LeftArrow from '@/icons/leftArrow';
import RightArrow from '@/icons/rightArrow';
import styles from "./BarCalendar.module.css";

interface Props {
    date: Date,
}

interface Day {
    date: Date,
    isToday?: boolean,
    workouts: Workout[],
}

interface Workout {
    date: Date,
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

const shortMonths: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];

const shortWeekDays: string[] = [
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

    const [selectedWeek, setSelectedWeek] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), today.getDate() + ((today.getDay() === 0) ? -6 : 1 - today.getDay())));
    const [selectedMonth, setSelectedMonth] = useState<Date>(new Date(today.getFullYear(), today.getMonth()));
    const [selectedYear, setSelectedYear] = useState<Date>(new Date(today.getFullYear(), 0));

    const [workouts, setWorkouts] = useState<Workout[]>([]);;

    const [timeScale, setTimeScale] = useState({
        time1: 30,
        time2: 60,
        time3: 90,
        timeMax: 120
      });

    const [togglePosition, setTogglePosition] = useState<0 | 1 | 2 | 3>(0);

    const handleActivity = async () => {
        const firstDay = getFirstCalendarDay();
        const lastDay = getLastCalendarDay();

        let range = {};

        if (firstDay) {
            const firstDateDay = String(firstDay.getDate()).padStart(2, '0')
            const firstDateMonth = String(firstDay.getMonth() + 1).padStart(2, '0');
            range = {begin: `${firstDateDay}-${firstDateMonth}-${firstDay.getFullYear()}`};
        }
        if (lastDay) {
            const lastDateDay = String(lastDay.getDate()).padStart(2, '0');
            const lastDateMonth = String(lastDay.getMonth() + 1).padStart(2, '0');
            range = {...range, end: `${lastDateDay}-${lastDateMonth}-${lastDay.getFullYear()}`};
        }
        
		const result  = await Workout.workout.activity(range);

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
        let firstDay: Date;
        if (togglePosition === 0) firstDay = new Date(selectedWeek.getFullYear(), selectedWeek.getMonth(), selectedWeek.getDate());
        else if (togglePosition === 1) firstDay = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth());
        else firstDay = new Date(selectedYear.getFullYear(), 0);
        return firstDay;



        // let firstDay: Date | null;
        // if (togglePosition === 0) firstDay = new Date(selectedWeek.getFullYear(), selectedWeek.getMonth(), selectedWeek.getDate());
        // else if (togglePosition === 1) firstDay = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth());
        // else if (togglePosition === 2) firstDay = new Date(selectedYear.getFullYear());
        // else firstDay = null;
        // return firstDay;
    }

    const getLastCalendarDay = () => {
        let lastDay: Date;
        if (togglePosition === 0) lastDay = new Date(selectedWeek.getFullYear(), selectedWeek.getMonth(), selectedWeek.getDate() + 6);
        else if (togglePosition === 1) lastDay = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);
        else lastDay = new Date(selectedYear.getFullYear() + 1, 0, 0);
        return lastDay;



        // let lastDay: Date | null;
        // if (togglePosition === 0) lastDay = new Date(selectedWeek.getFullYear(), selectedWeek.getMonth(), selectedWeek.getDate() + 6);
        // else if (togglePosition === 1) lastDay = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);
        // else if (togglePosition === 2) lastDay = new Date(selectedYear.getFullYear());
        // else lastDay = null;
        // return lastDay;
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
        let maxDuration = 0;
        for (let day = getFirstCalendarDay(); day.getTime() <= getLastCalendarDay().getTime(); day.setDate(day.getDate() + 1)) {
            const currentDay = new Date(day);
            let totalDuration = 0;
            days.push({
                date: currentDay,
                isToday: currentDay.getTime() === new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime(),
                workouts: [],
            })
            while (workouts[workoutsIndex] && currentDay.getTime() === workouts[workoutsIndex].date.getTime()) {
                totalDuration += workouts[workoutsIndex].duration;
                days[days.length - 1].workouts.push(workouts[workoutsIndex++]);
            }
            if (days[days.length - 1].workouts.length == 0) days[days.length - 1].workouts.push({
                date: currentDay,
                duration: 0,
                kind: "gym",
            })
            maxDuration = maxDuration <= totalDuration ? totalDuration : maxDuration;
        }

        changeTimeScale(maxDuration);

        return days;
    }

    const changeTimeScale = (maxDuration: number) => {
        if (maxDuration <= 120) {
            setTimeScale({ time1: 30, time2: 60, time3: 90, timeMax: 120});
        }
        else if (maxDuration <= 240) {
            setTimeScale({ time1: 60, time2: 120, time3: 180, timeMax: 240});
        }
    }

    const getDateInterval = () => {
        const begin = getFirstCalendarDay();
        const end = getLastCalendarDay();

        const firstPart = `${shortMonths[begin.getMonth()]} ${begin.getDate()}` + (begin.getFullYear() !== end.getFullYear() ? `, ${begin.getFullYear()}` : "");
        const secondPart = `${shortMonths[end.getMonth()]} ${end.getDate()}, ${end.getFullYear()}`;

        return `${firstPart} - ${secondPart}`;
    }

    const setPreviousDateInterval = () => {
        if (togglePosition === 0) setSelectedWeek(new Date(selectedWeek.getFullYear(), selectedWeek.getMonth(), selectedWeek.getDate() - 7));
        else if (togglePosition === 1) setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1));
        else if (togglePosition === 2) setSelectedYear(new Date(selectedYear.getFullYear() - 1, 0));
    }

    const setNextDateInterval = () => {
        if (togglePosition === 0) setSelectedWeek(new Date(selectedWeek.getFullYear(), selectedWeek.getMonth(),  selectedWeek.getDate() + 7));
        else if (togglePosition === 1) setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1));
        else if (togglePosition === 2) setSelectedYear(new Date(selectedYear.getFullYear() + 1, 0));
    }

    useEffect(() => {
        handleActivity().then(() => {
            setDays(fillCalendar());
        })
    }, [selectedWeek, selectedMonth, selectedYear, togglePosition]);


    const [days, setDays] = useState<Day[]>([])
    // const [days, setDays] = useState<Day[]>([{workouts: [{duration: 50}]}, 
    //     {workouts: [{duration: 121}]}, 
    //     {workouts: [{duration: 30}, {duration: 50}]}, 
    //     {workouts: [{duration: 31}]},
    //     {workouts: [{duration: 0}]},
    //     {workouts: [{duration: 70}, {duration: 30}]},
    //     {workouts: [{duration: 120}]},
    // ]);

    return (
        <div className={styles.barCalendar}>
            <div className={styles.header}>
                <button className={styles.dateButton} onClick={setPreviousDateInterval}>
                    <LeftArrow className={styles.arrow}/>
                </button>

                <div className={styles.dateInterval}>{getDateInterval()}</div>
                
                <button className={styles.dateButton} onClick={setNextDateInterval}>
                    <RightArrow className={styles.arrow}/>
                </button>
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
                                                style={{ height: `${workout.duration / timeScale.timeMax * 100}%`}}
                                                className={`${styles.bar} ${index !== 0 && styles.extraBar}`}
                                            />
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                    
                    <div className={styles.time} style={{ bottom: "84px" }}>
                        {`${String(Math.floor(timeScale.time3 / 60)).padStart(2, '0')}:${String(timeScale.time3 % 60).padStart(2, '0')}`}</div>
                    <div className={styles.time} style={{ bottom: "54px" }}>
                        {`${String(Math.floor(timeScale.time2 / 60)).padStart(2, '0')}:${String(timeScale.time2 % 60).padStart(2, '0')}`}</div>
                    <div className={styles.time} style={{ bottom: "24px" }}>
                        {`${String(Math.floor(timeScale.time1 / 60)).padStart(2, '0')}:${String(timeScale.time1 % 60).padStart(2, '0')}`}</div>
                    <hr className={styles.backgroundLine} style={{ bottom: "90px" }}/>
                    <hr className={styles.backgroundLine} style={{ bottom: "60px" }}/>
                    <hr className={styles.backgroundLine} style={{ bottom: "30px" }}/>
                    <hr className={styles.bottomLine}/>
                </div>


                <div className={styles.timeDesignations}>
                    {shortWeekDays.map((weekDay, index) => {
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