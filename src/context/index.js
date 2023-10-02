"use client";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import CircleLoader from "../components/circle-loader";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [loggedInAccount, setLoggedInAccount] = useState(null);
  const [account, setAccount] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);
  const [mediaData, setMediaData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [currentMediaInfoIdandType, setCurrentMediaInfoIdandType] =
    useState(null);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [mediaDetails, setMediaDetails] = useState(null);
  const [similarMedia, setSimilarMedia] = useState([]);

  const { data: session } = useSession();

  useEffect(() => {
    setLoggedInAccount(JSON.parse(sessionStorage.getItem("loggedInAccount")));
  }, []);
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
        mediaData,
        setMediaData,
        searchResult,
        setSearchResult,
        currentMediaInfoIdandType,
        setCurrentMediaInfoIdandType,
        showDetailsPopup,
        setShowDetailsPopup,
        mediaDetails,
        setMediaDetails,
        similarMedia,
        setSimilarMedia,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
