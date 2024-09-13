import Calendar from "@/components/calendar/calendar";

export default function Home() {
    const date: Date = new Date();

    return (
        <main>
            <div>
                <Calendar date={date}/>
            </div>
        </main>
    );
}
