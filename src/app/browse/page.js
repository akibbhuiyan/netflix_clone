"use client";

import React, { useContext } from "react";
import { useSession } from "next-auth/react";
import UnAuthPage from "@/src/components/unAuthPage";
import { GlobalContext } from "@/src/context";
import ManageAcount from "@/src/components/manage-account";
import CommonLayout from "@/src/components/commonLayout";

const Browse = () => {
  const { loggedInAccount } = useContext(GlobalContext);
  const { data: session } = useSession();
  console.log(session);
  if (!session) return <UnAuthPage />;

  if (loggedInAccount === null) return <ManageAcount />;

  return (
    <main className="flex min-h-screen flex-col ">
      <CommonLayout />
    </main>
  );
};

export default Browse;
