import Calendar from "@/components/Calendar/Calendar";

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
