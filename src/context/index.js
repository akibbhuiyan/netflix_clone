"use client";
import { useSession } from "next-auth/react";
import { createContext, useState } from "react";
import CircleLoader from "../components/circle-loader";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [loggedInAccount, setLoggedInAccount] = useState(null);
  const [account, setAccount] = useState();

  const { data: session } = useSession();

  if (!session) return <CircleLoader />;
  return (
    <GlobalContext.Provider value={{ loggedInAccount, setLoggedInAccount,account, setAccount }}>
      {children}
    </GlobalContext.Provider>
  );
}
