"use client"

import { useState } from "react";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import * as Api from "@/api";

const Test: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        date: "",
        duration: 0,
        kind: "",
    });

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        let result = await Api.workout.create({ date: formData.date, duration: formData.duration, kind: formData.kind })



        console.log(result);


        console.log(`Date: ${formData.date}, duration: ${formData.duration}, kind: ${formData.kind}`)
        e.preventDefault();
        setIsModalOpen(false);
    };

    return (
        <div>
            <Button
                label="Add"
                onClick={handleOpenModal}
            />

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2>Form Inside Modal</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="date">Date: </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            required
                            value={formData.date}
                            onChange={handleChange}
                            pattern="\d{2}-\d{2}-\d{4}"
                        />
                    </div>

                    <div>
                        <label htmlFor="duration">Duration: </label>
                        <input
                            type="number"
                            id="duration"
                            name="duration"
                            required
                            min="1"
                            value={formData.duration}
                            onChange={handleChange}
                            placeholder="Enter positive numbers"
                        />
                    </div>

                    <div>
                        <label htmlFor="kind">Kind: </label>
                        <input
                            type="text"
                            id="kind"
                            name="kind"
                            required
                            value={formData.kind}
                            onChange={handleChange}
                            placeholder="Enter the type"
                        />
                    </div>

                    <button type="submit">Submit</button>
                </form>
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
