'use client';

import Button from "@/components/Button/Button";
import { toast } from "sonner";

const Test: React.FC = () => {

    const clicked = () => {
        console.log('clicked');
    }

    return (
        <div>
            <Button
                label="ok"
                onClick={() => toast.success("let it be")}
            />
            <Button
                label="fail"
                onClick={() => toast.error("S-O-S")}
            />
        </div>
    );
};

export default Test;
