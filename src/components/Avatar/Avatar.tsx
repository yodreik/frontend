"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

interface Props {
    className?: string;
    height: number;
    width: number;
}

const Avatar = (props: Props) => {
    const { isLoading, userdata } = useAuth();
    const [hasError, setHasError] = useState(false);

    return (
        <>
            {
                !(isLoading) && <>
                    <Image
                        src={hasError ? '/images/emptyAvatarWhite.png' : userdata.avatar_url}
                        alt="Avatar"
                        className={props.className}
                        height={props.height} 
                        width={props.width}
                        onError={() => setHasError(true)}
                    />
                </> 
            }
        </>
    );
};

export default Avatar;