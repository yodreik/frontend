"use client"

import { ReactNode } from "react";
import styles from "./DonutChart.module.css";

interface Props {
    className?: string;
    parts: Part[];
    children: ReactNode;
}

interface Part {
    value: number;
    color: string;
}

const DonutChart = (props: Props) => {
    const totalValue = props.parts.reduce((sum, part) => sum + part.value, 0);
    const percentages: number[] = props.parts.map(part => (part.value / totalValue) * 100 - 5);
    const startPercents: number[] = [2.5];

    for (let i = 1; i < percentages.length; i++) {
        const sum = percentages[i - 1] + startPercents[i - 1] + 5;
        startPercents[i] = sum;
    }

    return (
        <div className={props.className}>
            {props.children}

            {props.parts.length > 1 && 
                percentages.map((percentage, index) => {
                return (
                    <div 
                        key={index}
                        className={styles.donut} 
                        style={{ "--r": `${startPercents[index]}`, "--p": `${percentage}`, "--c": `${props.parts[index].color}`} as React.CSSProperties}
                    />
                )
            })}

            {props.parts.length == 1 && 
                <div 
                    className={styles.donut}
                    style={{ "--r": "0", "--p": "100", "--c": `${props.parts[0].color}`} as React.CSSProperties}
                />
            }
        </div>
    );
};

export default DonutChart;
