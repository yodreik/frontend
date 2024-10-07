"use client"

import styles from "./page.module.css";
import { useState } from 'react';
import SegmentedControl from "@/components/SegmentedControl/SegmentedControl";

export default function Home() {
    const [togglePosition, setTogglePosition] = useState<number>(0);
    const selections = ["Week", "Month", "Year", "All time", "Хуй"];

    return (
        <main>
            <div className={styles.temporaryStatistics}>
                <div className={styles.container}>
                    <SegmentedControl size={styles.width} selections={selections} getSelection={togglePosition} setSelection={setTogglePosition} />
                </div>
                <div>empty for now</div>
            </div>
        </main>
    );
}
