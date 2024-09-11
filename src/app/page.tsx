import Calendar from "@/components/calendar/calendar";

export default function Home() {
    const date: Date = new Date(2024, 9, 2);

    return (
        <main>
            <div>
                <Calendar date={date}/>
            </div>
        </main>
    );
}
