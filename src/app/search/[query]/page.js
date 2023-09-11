"use client";

import { useSession } from "next-auth/react";
import React, { useContext } from "react";
import UnAuthPage from "../../../components/unAuthPage";
import { GlobalContext } from "@/src/context";
import ManageAcount from "@/src/components/manage-account";

const Search = () => {
  const { loggedInAccount } = useContext(GlobalContext);

  const { data: session } = useSession();

  if (!session === null) return <UnAuthPage />;
  if (loggedInAccount === null) return <ManageAcount />;

  return <div>serch</div>;
};

export default Search;
