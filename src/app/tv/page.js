"use client";

import React, { useContext } from "react";
import UnAuthPage from "../../components/unAuthPage";
import { useSession } from "next-auth/react";
import { GlobalContext } from "@/src/context";
import ManageAcount from "@/src/components/manage-account";

const Tv = () => {
  const { loggedInAccount } = useContext(GlobalContext);

  const { data: session } = useSession();

  if (!session === null) return <UnAuthPage />;
  if (loggedInAccount === null) return <ManageAcount />;

  return <div>Tv</div>;
};

export default Tv;
