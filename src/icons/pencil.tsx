const Pencil: React.FC<{className: string}> = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.8566 1.87997L3.20416 9.79968L5.35671 11.6447L13.12 4.14341C13.7412 3.51807 13.7399 2.5076 13.1161 1.88386C12.4924 1.26014 11.4819 1.25884 10.8566 1.87997ZM4.19046 12.5089L1.76285 13.2372L2.4332 11.0026L4.19046 12.5089ZM9.85208 0.883244C11.0297 -0.294413 12.9391 -0.294416 14.1168 0.883242C15.2944 2.0609 15.2944 3.97026 14.1168 5.14792L14.1081 5.15643L5.4445 13.5277C5.36324 13.6062 5.26437 13.6641 5.15615 13.6966L0.910876 14.9701C0.66156 15.0449 0.391309 14.9768 0.207253 14.7927C0.0231978 14.6087 -0.0449372 14.3384 0.0298577 14.0891L1.30344 9.84385C1.33591 9.73563 1.39382 9.63676 1.47233 9.55551L9.84357 0.891903L9.85208 0.883244Z" fill="#FAFAFA"/>
        </svg>
    );
}

export default Pencil;