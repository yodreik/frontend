"use client"

import { ChangeEvent, useState } from "react";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import * as Api from "@/api";
import styles from "./page.module.css";
import Input from "@/components/Input/Input";
import { useToast } from "@/context/ToastContext";

const Test: React.FC = () => {

    const { success } = useToast();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [dateValue, setDateValue] = useState("");
    const [durationValue, setDurationValue] = useState("");
    const [kindValue, setKindValue] = useState("");

    const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;

        setDateValue(input);
        setDateValue(e.target.value);
    };

    const onChangeDuration = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;

        setDurationValue(input);
    };

    const onChangeKind = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;

        setKindValue(input);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async () => {
        let result = await Api.workout.create({ date: dateValue.split("-").reverse().join("-"), duration: Number(durationValue), kind: kindValue });

        if (result.status === 201) {
            success("Created", "2");
        } else {
            success("Failed to create workout", "big");
        }

        setIsModalOpen(false);
    };

    return (
        <div>
            <Button
                label="Add"
                onClick={handleOpenModal}
            />
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
        </div>
    );
};

export default Test;
