"use client";

import ErrorPage from "@/components/Error/Error";

export default function Home() {
    return (
        <ErrorPage title="500" icon=":c" message="seems our server fell asleep" />
    );
}