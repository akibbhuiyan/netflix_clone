"use client";

import React, { useContext } from "react";
import { useSession } from "next-auth/react";
import UnAuthPage from "../../components/unAuthPage";
import { GlobalContext } from "@/src/context";
import ManageAcount from "@/src/components/manage-account";

const Movies = () => {
  const { loggedInAccount } = useContext(GlobalContext);
  const { data: session } = useSession();

  if (!session === null) return <UnAuthPage />;
  if (loggedInAccount === null) return <ManageAcount />;

  return <div>Movies</div>;
};

export default Movies;
