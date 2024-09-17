const RightArrow: React.FC<{className: string}> = ({className}) => {
    return (
        <svg width="19" height="31" viewBox="0 0 19 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className={className} fill-rule="evenodd" clip-rule="evenodd" d="M0.794997 0.756641C1.85499 -0.252214 3.57358 -0.252214 4.63358 0.756641L18.205 13.6733C19.265 14.6822 19.265 16.3178 18.205 17.3267L4.63358 30.2434C3.57358 31.2522 1.85499 31.2522 0.794996 30.2434C-0.264999 29.2345 -0.264999 27.5988 0.794996 26.59L12.4471 15.5L0.794997 4.41003C-0.264997 3.40117 -0.264997 1.7655 0.794997 0.756641Z"/>
        </svg>
    );
}

export default RightArrow;