"use client";

import styles from "./page.module.css";
import { useState } from "react";
import SegmentedControl from "@/components/ui/SegmentedControl/SegmentedControl";
import { useTheme } from "@/context/ThemeContext";
import Button from "@/components/ui/Button/Button";
import Container from "@/components/layout/Container/Container";

export default function Home() {
    const { toggleTheme, changeTheme, changeColor } = useTheme();

    return (
        <main>
            <Container className={styles.gap}>
                <Button label={"Сменить тему"} onClick={toggleTheme} />
                <div className={styles.newLine}>
                    <Button label={"Поставить светлую тему"} onClick={() => changeTheme("light")} />
                    <Button label={"Черный"} onClick={() => changeColor("black")} />
                    <Button label={"Аква"} onClick={() => changeColor("aqua")} />
                    <Button label={"Зелёный"} onClick={() => changeColor("green")} />
                </div>
                <div className={styles.newLine}>
                    <Button label={"Поставить тёмную тему"} onClick={() => changeTheme("dark")} />
                    <Button label={"Черный"} onClick={() => changeColor("black")} />
                    <Button label={"Аква"} onClick={() => changeColor("aqua")} />
                    <Button label={"Зелёный"} onClick={() => changeColor("green")} />
                </div>
            </Container>
        </main>
    );
}
