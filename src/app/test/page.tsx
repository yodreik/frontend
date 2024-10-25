import Button from "@/components/Button/Button";

const Test: React.FC = () => {

    const clicked = () => {
        console.log('clicked');
    }

    return (
        <div>
            <Button
                label="Add"
                onClick={clicked}
            />
        </div>
    );
};

export default Test;
