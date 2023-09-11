"use client";

import { signIn } from "next-auth/react";

const UnAuthPage = () => {
  return (
    <div>
      <button onClick={() => signIn("github")}>Sing In</button>
    </div>
  );
};

export default UnAuthPage;
