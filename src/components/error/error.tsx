"use client"

import styles from "./error.module.css";

interface Props {
    title: string;
    icon?: string;
    message?: string;
}

// TODO: Change props.icon to something like svg image
const ErrorPage: React.FC<Props> = (props: Props) => {
    return <>
        <div className={styles.screen}>
            <div className={styles.container}>
                <div className={styles.title_container}>
                    <div className={styles.title}>{props.title}</div>
                    <div className={styles.icon}>{props.icon}</div>
                </div>
                <div className={styles.message}>{props.message}</div>
            </div>
        </div>
    </>;
}

export default ErrorPage;