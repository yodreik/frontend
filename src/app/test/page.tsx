"use client";

import Header from "@/components/header/header";
import Button from "@/components/button/button";
import style from "./page.module.css";

const AuthenticatePage = () => {
  return (
    <>
      <Header />
      <div>
        <h1>Authenticate</h1>
        <Button
          className={style.color}
          label="Dashboard"
          onClick={() => console.log("clicked")}
          disabled={true}
        />
        <Button
          className={style.color}
          label="Dashboard"
          onClick={() => console.log("clicked")}
          disabled={false}
        />
      </div>
    </>
  );
};

export default AuthenticatePage;
