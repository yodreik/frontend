"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

const Avatar = () => {
    const { isAuthorized, isLoading, userdata } = useAuth();

    // const user: User = {
    //     id: userdata?.id,
    //     username: userdata?.username,
    //     email: userdata?.email,
    //     avatarURL: userdata?.avatar_url,
    // }

    // return (
    //     <>
    //         <Image
    //             src={user.avatarURL}
    //             alt="Avatar"
    //             className={styles.avatar}
    //             width={45}
    //             height={45} 
    //         />
    //     </>
    // );
};

export default Avatar;