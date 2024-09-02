"use client";

import ErrorPage from "@/components/error/error";

export default function Home() {
    return (
        <ErrorPage title="404" icon=":c" message="seems there is no such page" />
    );
}