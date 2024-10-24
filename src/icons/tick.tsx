const Tick: React.FC<{className: string}> = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 12 11" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M11.2809 0.375342C11.6259 0.806604 11.556 1.4359 11.1248 1.78091C9.97754 2.69869 8.80902 4.24894 7.78679 5.89294C6.77683 7.5172 5.96181 9.14697 5.50373 10.1464C5.34913 10.4837 5.02046 10.7077 4.64997 10.7282C4.27947 10.7488 3.92808 10.5624 3.73717 10.2443C3.40912 9.69751 2.80595 8.96896 2.13845 8.27016C1.47328 7.57382 0.814006 6.97959 0.411899 6.68715C-0.0347538 6.36231 -0.133504 5.7369 0.191334 5.29024C0.516173 4.84359 1.14159 4.74484 1.58824 5.06968C2.12758 5.46192 2.88046 6.15148 3.58467 6.8887C3.86461 7.18177 4.14799 7.49393 4.41558 7.81009C4.87118 6.91808 5.44068 5.87849 6.08835 4.83686C7.14157 3.14302 8.45504 1.35544 9.87538 0.219168C10.3066 -0.125842 10.9359 -0.0559202 11.2809 0.375342Z"/>
        </svg>
    );
}

export default Tick;