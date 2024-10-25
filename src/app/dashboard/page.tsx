"use client"

import { toast } from 'sonner';
import BarCalendar from "@/components/BarCalendar/BarCalendar";
import Calendar from "@/components/Calendar/Calendar";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/Button/Button";
import styles from "./page.module.css";
import * as Api from "@/api";

import { ChangeEvent, useState } from "react";
import Modal from "@/components/Modal/Modal";
import Input from "@/components/Input/Input";

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
            range = { begin: `${firstDateDay}-${firstDateMonth}-${firstDay.getFullYear()}` };
        }
        if (lastDay) {
            const lastDateDay = String(lastDay.getDate()).padStart(2, '0');
            const lastDateMonth = String(lastDay.getMonth() + 1).padStart(2, '0');
            range = { ...range, end: `${lastDateDay}-${lastDateMonth}-${lastDay.getFullYear()}` };
        }

        const result = await Api.workout.activity(range);

        if (!("message" in result)) {
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
        if (userdata) {
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

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [dateValue, setDateValue] = useState("");
    const [durationValue, setDurationValue] = useState("");
    const [kindValue, setKindValue] = useState("");

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async () => {
        let result = await Api.workout.create({ date: dateValue.split("-").reverse().join("-"), duration: Number(durationValue), kind: kindValue });

        if (result.status === 201) {
            toast.success("Successfully created a workout record");
        } else {
            toast.error("Failed to create workout");
        }

        setIsModalOpen(false);
    };

    return (
        <div className={styles.screen}>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <div className={styles.modalInnerContainer}>
                    <h2 className={styles.modalTitle}>Create a workout</h2>
                    <div className={styles.formElement}>
                        <Input
                            value={dateValue}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setDateValue(e.target.value)}
                            type="date"
                            status={"default"}
                            placeholder="Date"
                        />
                    </div>

                    <div className={styles.formElement}>
                        <Input
                            value={durationValue}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setDurationValue(e.target.value)}
                            type="number"
                            status={"default"}
                            placeholder="Duration"
                        />
                    </div>

                    <div className={styles.formElement}>
                        <Input
                            value={kindValue}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setKindValue(e.target.value)}
                            type="text"
                            status={"default"}
                            placeholder="Kind"
                        />
                    </div>

                    <div className={styles.formElement}>
                        <Button
                            label="Submit"
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Modal>

            <div className={styles.container}>
                <div className={styles.column}>
                    <div className={styles.chapter}>
                        <div className={styles.title}>Activity history</div>
                        <Calendar getActivity={handleActivity} />
                    </div>
                    <div className={styles.chapter}>
                        <BarCalendar getActivity={handleActivity} getCreatedAt={handleCreatedAt} />
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.chapter}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div className={styles.title}>Statistics</div>
                        </div>
                        <div className={styles.temporaryStatistics} />
                    </div>
                    <div className={styles.chapter}>
                        <div className={styles.title}>Weight change</div>
                        <div className={styles.temporaryWeight} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button
                            label="Add workout"
                            onClick={handleOpenModal}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;