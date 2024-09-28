"use client"

import { useState } from "react";
import * as Workout from "@/api";
import Calendar from "@/components/Calendar/Calendar";
import BarCalendar from "@/components/BarCalendar/BarCalendar";
import styles from "./page.module.css";

interface Workout {
    date: Date,
    duration: number,
    kind: string,
}

const DashboardPage = () => {
    const date: Date = new Date();

    const [workouts, setWorkouts] = useState<Workout[]>([]);

    const handleActivity = async (firstDay: Date, lastDay: Date) => {
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
                newWorkouts.push({
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

    const parseDate = (dateString: string) => {
        const parts: string[] = dateString.split('-');
        const day: number = parseInt(parts[0], 10);
        const month: number = parseInt(parts[1], 10) - 1;
        const year: number = parseInt(parts[2], 10);

        return new Date(year, month, day);
    }


    return (
        <div className={styles.screen}>
            <div className={styles.container}>
                <div className={styles.column}>
                    <div className={styles.chapter}>
                        <div className={styles.title}>Activity history</div>
                        <Calendar workouts={workouts} getActivity={handleActivity}/>
                    </div>
                    <div className={styles.chapter}>
                        <BarCalendar date={date}/>
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.chapter}>
                        <div className={styles.title}>Statistics</div>
                        <div className={styles.temporaryStatistics}/>
                    </div>
                    <div className={styles.chapter}>
                        <div className={styles.title}>Weight change</div>
                        <div className={styles.temporaryWeight}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;