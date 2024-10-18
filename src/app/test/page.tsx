"use client"

import { ChangeEvent, useState } from "react";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import * as Api from "@/api";
import styles from "./page.module.css";
import Input from "@/components/Input/Input";

const Test: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        date: "",
        duration: 0,
        kind: "",
    });

    const [dateValue, setDateValue] = useState("");
    const [durationValue, setDurationValue] = useState("");
    const [kindValue, setKindValue] = useState("");

    const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;

        setDateValue(input);
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        let result = await Api.workout.create({ date: formData.date.split("-").reverse().join("-"), duration: Number(formData.duration), kind: formData.kind });

        setIsModalOpen(false);
    };

    return (
        <div>
            <Button
                label="Add"
                onClick={handleOpenModal}
            />

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <div>
                    <div className={styles.modalInnerContainer}>
                        <h2 className={styles.modalTitle}>Create a workout</h2>
                        <div className={styles.formElement}>
                            <Input
                                value={dateValue}
                                onChange={onChangeDate}
                                type="date"
                                status={"default"}
                                placeholder="Date"
                            />
                        </div>

                        <div className={styles.formElement}>
                            <Input
                                value={durationValue}
                                onChange={onChangeDuration}
                                type="number"
                                status={"default"}
                                placeholder="Duration"
                            />
                        </div>

                        <div className={styles.formElement}>
                            <Input
                                value={kindValue}
                                onChange={onChangeKind}
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
                </div>
            </Modal>

            <style jsx>{`
        button {
          background-color: #0070f3;
          border: none;
          padding: 10px 20px;
          color: white;
          cursor: pointer;
          border-radius: 5px;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        input {
          padding: 5px;
          border-radius: 4px;
          border: 1px solid #ccc;
        }

        label {
          margin-right: 10px;
        }
      `}</style>
        </div>
    );
};

export default Test;
