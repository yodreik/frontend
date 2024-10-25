"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

interface Props {
    className?: string;
    height: number;
    width: number;
}

const Avatar = (props: Props) => {
    const { isLoading, userdata } = useAuth();
    const [avatarURL, setAvatarURL] = useState<string>("/images/emptyAvatarWhite.png");

    useEffect(() => {
        if (userdata.avatar_url) {
            setAvatarURL(userdata.avatar_url);
        }
    }, [userdata.avatar_url])

    const handleError = () => {
        setAvatarURL("/images/emptyAvatarWhite.png");
    };

    return (
        <>
            {
                !(isLoading) && <>
                    <Image
                        src={avatarURL}
                        alt="Avatar"
                        className={props.className}
                        height={props.height} 
                        width={props.width}
                        onError={handleError}
                        priority
                    />
                </> 
            }
        </>
    );
};

export default Avatar;