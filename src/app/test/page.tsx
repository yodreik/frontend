"use client";

import Header from "@/components/header/header";
import Button from "@/components/button/button";

const AuthenticatePage = () => {
  return (
    <>
      <Header />
      <div>
        <h1>Authenticate</h1>
        <Button
          label="Dashboard"
          onClick={() => console.log("clicked")}
          disabled={false}
        />
      </div>
    </>
  );
};

export default AuthenticatePage;
