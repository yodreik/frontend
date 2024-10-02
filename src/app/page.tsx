import styles from "./page.module.css";
import DonutChart from "@/components/DonutChart/DonutChart";

interface Part {
    value: number;
    color: string;
}

export default function Home() {
    const Parts: Part[] = [
        {value: 10, color: "var(--accent)"},
        {value: 10, color: "var(--accent)"},
        {value: 10, color: "var(--accent)"}
    ]
    return (
        <main>
            <div className={styles.temporaryStatistics}>
                <div className={styles.container}>
                    <div className={styles.day}>15</div>
                    <div className={styles.pie} style={{ '--r': '0', '--p': '10', '--c': 'var(--accent)'} as React.CSSProperties}/>
                    <div className={styles.pie} style={{ '--r': '15', '--p': '50', '--c': 'var(--sexy-blue)'} as React.CSSProperties}/>
                    <div className={styles.pie} style={{ '--r': '70', '--p': '25', '--c': 'var(--red)'} as React.CSSProperties}/>
                </div>
                <DonutChart className={styles.container} parts={Parts}>
                    <div className={styles.day}>15</div>
                </DonutChart>
                <div>empty for now</div>
            </div>
        </main>
    );
}
