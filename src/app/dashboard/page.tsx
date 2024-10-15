"use client"

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
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
    const { userdata } = useAuth();

    const workouts = new Map<string, Workout>();

    const handleActivity = async (firstDay: Date | null, lastDay: Date | null) => {
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
        
		const result = await Workout.workout.activity(range);

		if (!("message" in result)){
            const workouts = new Map<string, Workout>()

            result.workouts.forEach(workout => {
                workouts.set(workout.id, {
                    date: parseDate(workout.date),
                    duration: workout.duration,
                    kind: workout.kind,
                })
            });
            
            return workouts;
		}
		else {
			console.log(result.message);
            return workouts;
		}
 	};

    const handleCreatedAt = () => {
        if (userdata){
            return new Date(userdata.created_at);
        }
        else {
            return new Date();
        }
    }

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
                        <Calendar getActivity={handleActivity}/>
                    </div>
                    <div className={styles.chapter}>
                        <BarCalendar getActivity={handleActivity} getCreatedAt={handleCreatedAt}/>
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