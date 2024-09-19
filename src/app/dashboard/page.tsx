"use client"

import Calendar from "@/components/Calendar/Calendar";
import BarCalendar from "@/components/BarCalendar/BarCalendar";
import styles from "./page.module.css";

const DashboardPage = () => {
    const date: Date = new Date();


    return (
        <div className={styles.screen}>
            <div className={styles.container}>
                <div className={styles.column}>
                    <div className={styles.chapter}>
                        <div className={styles.title}>Activity history</div>
                        <Calendar date={date}/>
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