const LeftArrow: React.FC<{className: string}> = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 19 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M18.205 0.756641C17.145 -0.252214 15.4264 -0.252214 14.3664 0.756641L0.794996 13.6733C-0.264999 14.6822 -0.264999 16.3178 0.794996 17.3267L14.3664 30.2434C15.4264 31.2522 17.145 31.2522 18.205 30.2434C19.265 29.2345 19.265 27.5988 18.205 26.59L6.55286 15.5L18.205 4.41003C19.265 3.40117 19.265 1.7655 18.205 0.756641Z"/>
        </svg>
    );
}

export default LeftArrow;