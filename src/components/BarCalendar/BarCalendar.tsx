"use client"

import { useEffect, useState } from 'react';
import LeftArrow from '@/icons/leftArrow';
import RightArrow from '@/icons/rightArrow';
import styles from "./BarCalendar.module.css";

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

interface Props {
    getActivity: (firstDay: Date, lastDay: Date) => Promise<Map<string, Workout>>,
    getCreatedAt: () => Date,
}

interface Bar {
    date: Date,
    isCurrent: boolean,
    workouts: Map<string, Workout>,
}

interface Workout {
    date: Date,
    duration: number,
    kind: string,
}



const BarCalendar = ({ getActivity, getCreatedAt}: Props) => {
    const today = new Date();

    const [selectedWeek, setSelectedWeek] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), today.getDate() + ((today.getDay() === 0) ? -6 : 1 - today.getDay())));
    const [selectedMonth, setSelectedMonth] = useState<Date>(new Date(today.getFullYear(), today.getMonth()));
    const [selectedYear, setSelectedYear] = useState<Date>(new Date(today.getFullYear(), 0));

    const [timeScale, setTimeScale] = useState({ time1: "00:30", time2: "01:00", time3: "01:30", timeMax: 120});
    const [timeDesignations, setTimeDesignations] = useState<string[]>(["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]);

    const [togglePosition, setTogglePosition] = useState<0 | 1 | 2 | 3>(0);

    const getFirstCalendarDay = () => {
        let firstDay: Date;
        
        switch (togglePosition) {
            case 0: firstDay = new Date(selectedWeek.getFullYear(), selectedWeek.getMonth(), selectedWeek.getDate()); break;
            case 1: firstDay = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth()); break;
            case 2: firstDay = new Date(selectedYear.getFullYear(), 0); break;
            default: firstDay = new Date(getCreatedAt().getFullYear(), 0); break;
        }

        return firstDay;
    }

    const getLastCalendarDay = () => {
        let lastDay: Date;

        switch (togglePosition) {
            case 0: lastDay = new Date(selectedWeek.getFullYear(), selectedWeek.getMonth(), selectedWeek.getDate() + 6); break;
            case 1: lastDay = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0); break;
            case 2: lastDay = new Date(selectedYear.getFullYear() + 1, 0, 0); break;
            default: lastDay = new Date(today.getFullYear() + 3, 0, 0); break;
        }

        return lastDay;
    }

    const createCalendar = () => {
        const bars = new Map<number, Bar>();
        const firstDate = getFirstCalendarDay();
        const lastDate = getLastCalendarDay();
        let bar = firstDate

        if (togglePosition === 1){
            lastDate.setDate(31);
        }

        const nextDate = () => {
            if (togglePosition === 0 || togglePosition === 1) bar.setDate(bar.getDate() + 1);
            else if (togglePosition === 2) bar.setMonth(bar.getMonth() + 1);
            else bar.setFullYear(bar.getFullYear() + 1);
        }

        for (bar; bar.getTime() <= lastDate.getTime(); nextDate()) {
            const currentBar = new Date(bar);
            bars.set(currentBar.getTime(),
                {
                    date: currentBar,
                    isCurrent: currentBar.getTime() === new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime(),
                    workouts: new Map<string, Workout>(),
                }
            )
        }
        
        return bars;
    }

    const fillCalendar = (bars: Map<number, Bar>, workouts: Map<string, Workout>) => {

        if (togglePosition === 0 || togglePosition === 1) {
            workouts.forEach((workout, key) => {
                bars.get(workout.date.getTime())?.workouts.set(key, workout);
            });
        }
        else if (togglePosition === 2) {
            let isAdded;
            
            workouts.forEach((workout, key) => {
                isAdded = false;
                const currentBar = bars.get((new Date(workout.date.getFullYear(), workout.date.getMonth()).getTime()));

                currentBar?.workouts.forEach((bar, key) => {
                    if (workout.kind === bar.kind){
                        bar.duration += workout.duration;
                        isAdded = true;
                    }
                });
                if (!isAdded) {
                    currentBar?.workouts.set(key, ({
                        date: new Date(workout.date.getFullYear(), workout.date.getMonth()),
                        duration: workout.duration,
                        kind: workout.kind,
                    }));
                }
            })
        }
        else if (togglePosition === 3) {
            let isAdded;

            workouts.forEach((workout, key) => {
                isAdded = false;
                const currentBar = bars.get((new Date(workout.date.getFullYear(), 0).getTime()));
                
                currentBar?.workouts.forEach((bar, key) => {
                    if (workout.kind === bar.kind){
                        bar.duration += workout.duration;
                        isAdded = true;
                    }
                });
                if (!isAdded) {
                    currentBar?.workouts.set(key, ({
                        date: new Date(workout.date.getFullYear(), 0),
                        duration: workout.duration,
                        kind: workout.kind,
                    }));
                }
            })
        }
        
        changeTimeScale(bars);

        return bars;
    }

    const changeTimeScale = (bars: Map<number, Bar>) => {
        let maxDuration = 0;

        bars.forEach((bar, key) => {
            let currentDuration = 0;

            bar.workouts.forEach((workout, key) => {
                currentDuration += workout.duration;
            })

            maxDuration = maxDuration <= currentDuration ? currentDuration : maxDuration;
        })

        if (maxDuration <= 120) {
            let timeMax = Math.ceil(maxDuration / 120) * 120;

            const time1 = `${timeMax / 4 * 1}m`
            const time2 = `${timeMax / 4 * 2}m`
            const time3 = `${timeMax / 4 * 3}m`

            setTimeScale({ time1, time2, time3, timeMax});
        }
        else {
            let timeMax = Math.ceil(maxDuration / 240) * 240;

            const time1 = `${(timeMax / 4 * 1) / 60}h`
            const time2 = `${(timeMax / 4 * 2) / 60}h`
            const time3 = `${(timeMax / 4 * 3) / 60}h`

            setTimeScale({ time1, time2, time3, timeMax});
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
        if (togglePosition === 0) setTimeDesignations(["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]);
        else if (togglePosition === 1) setTimeDesignations(["1", "", "", "", "", "",  "7", "", "", "", "", "", "", "14", "", "", "", "", "", "", "21", "", "", "", "", "", "","28", "", "", ""]);
        else if (togglePosition === 2) setTimeDesignations(["Jan", "", "Mar", "", "May", "", "Jul", "", "Sep", "", "Nov", ""]);
        else setTimeDesignations(Array.from({ length: getLastCalendarDay().getFullYear() - getFirstCalendarDay().getFullYear() + 3}, (_, i) => (getFirstCalendarDay().getFullYear() + i).toString()));
    }, [togglePosition])

    useEffect(() => {
        const calendar = createCalendar();
        const completedCalendar = createCalendar();
        const firstDay = getFirstCalendarDay();
        const lastDay = getLastCalendarDay();

        setBars(calendar);

        getActivity(firstDay, lastDay).then((workouts) => {
            if (workouts.size !== 0){
                setBars(fillCalendar(completedCalendar, workouts));
            }
        });
    }, [selectedWeek, selectedMonth, selectedYear, togglePosition]);

    const [bars, setBars] = useState<Map<number, Bar>>(createCalendar());

    return (
        <div className={styles.barCalendar}>
            <div className={styles.header}>
                <div className={styles.dateInterval}>{getDateInterval()}</div>
                
                {togglePosition !== 3 && 
                <div className={styles.dateButtons}>
                    <button className={styles.dateButton} onClick={setPreviousDateInterval}>
                        <LeftArrow className={styles.arrow}/>
                    </button>
                    <button className={styles.dateButton} onClick={setNextDateInterval}>
                        <RightArrow className={styles.arrow}/>
                    </button>
                </div>}
            </div>

            <div className={styles.body}>
                <div className={styles.graph}>
                    {Array.from(bars).map(([key, bar], index) => {
                        return (
                            <div key={index} className={styles.bar}>
                                <div
                                    key={index}
                                    className={styles.barPartsContainer}
                                >
                                    {Array.from(bar.workouts).map(([key, workout], index) => {
                                        return (
                                            <div
                                                key={index}
                                                style={{ height: `${workout.duration / timeScale.timeMax * 100}%`, backgroundColor: `var(--${workout.kind})`}}
                                                className={`${styles.barPart} ${index !== 0 && styles.extraBarPart}`}
                                            />
                                        )
                                    })}
                                </div>
                                <div className={styles.barTitle}>
                                    {timeDesignations[index]}
                                </div>
                            </div>
                        )
                    })}
                </div>
                
                <div className={styles.time} style={{ bottom: "114px" }}>{timeScale.time3}</div>
                <div className={styles.time} style={{ bottom: "84px" }}>{timeScale.time2}</div>
                <div className={styles.time} style={{ bottom: "54px" }}>{timeScale.time1}</div>
                <hr className={styles.backgroundLine} style={{ bottom: "120px" }}/>
                <hr className={styles.backgroundLine} style={{ bottom: "90px" }}/>
                <hr className={styles.backgroundLine} style={{ bottom: "60px" }}/>
                <hr className={styles.bottomLine}/>
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