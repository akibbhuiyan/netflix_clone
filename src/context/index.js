"use client";
import { useSession } from "next-auth/react";
import { createContext, useState } from "react";
import CircleLoader from "../components/circle-loader";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [loggedInAccount, setLoggedInAccount] = useState(null);
  const [account, setAccount] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);
  const { data: session } = useSession();

  // useEffect(() => {
  //   setLoggedInAccount(JSON.parse(sessionStorage.getItem("loggedInAccount")));
  // }, []);
  if (session === undefined) return <CircleLoader />;
  return (
    <GlobalContext.Provider
      value={{
        loggedInAccount,
        setLoggedInAccount,
        account,
        setAccount,
        pageLoader,
        setPageLoader,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
