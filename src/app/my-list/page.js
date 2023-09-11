"use client";

import { useSession } from "next-auth/react";
import React from "react";
import UnAuthPage from "../../components/unAuthPage";

const Page = () => {
  const { data: session } = useSession();

  if (!session === null) return <UnAuthPage />;
  return <div>My list</div>;
};

export default Page;
