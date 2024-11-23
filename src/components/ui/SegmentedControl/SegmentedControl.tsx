"use client";

import styles from "./SegmentedControl.module.css";

interface Props {
    size?: string;
    selections: string[];
    getSelection: number;
    setSelection: React.Dispatch<React.SetStateAction<number>>;
}

const SegmentedControl = ({size, selections, getSelection, setSelection}: Props) => {
    return (
        <div className={`${styles.toggle_container} ${size}`}>
            {selections.map((selection, index) => {
                return (
                    <div 
                        key={index}
                        className={styles.toggle_button} 
                        onClick={() => {setSelection(index)}}
                    >
                        {selections[index]}
                    </div>)
            })}
            
            <div 
                className={styles.active_toggle_button}
                style={{ left: `calc(${100 / selections.length * getSelection}% + 1px)`, width: `calc(${100 / selections.length}% - 2px)` }}
            >
                <div 
                    className={`${styles.active_titles_container} ${size}`}
                    style={{ left: `calc((${getSelection} * (-100%)) - 2px - 2 * ${getSelection}px)` }}
                >
                    {selections.map((selection, index) => {
                        return (
                            <div 
                                key={index}
                                className={styles.active_toggle_title} 
                                style={{ width: `calc(${100 / selections.length}%)` }}
                            >
                                {selections[index]}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );  
};

export default SegmentedControl;
