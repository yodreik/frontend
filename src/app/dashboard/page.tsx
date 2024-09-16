"use client"

import Calendar from "@/components/Calendar/Calendar";
import styles from "./page.module.css";

const DashboardPage = () => {
    const date: Date = new Date();


    return (
        <div className={styles.screen}>
            <div className={styles.container}>
                <div className={styles.chapter}>
                    <div className={styles.title}>Activity history</div>
                    <Calendar date={date}/>
                    <div className={styles.temporaryHistory}/>
                </div>
                <div className={styles.chapter}>
                    <div className={styles.title}>Statistics</div>
                    <div className={styles.temporaryStatistics}/>
                    <div className={styles.title}>Weight change</div>
                    <div className={styles.temporaryWeight}/>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;