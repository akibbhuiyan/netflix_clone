"use client";

import { GlobalContext } from "@/src/context";
import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";

export default function ManageAcount() {
  const { account, setAccount } = useContext(GlobalContext);
  const { data: session } = useSession();
  async function getAllAccounts() {
    const res = await fetch(
      `/api/account/getAllAccount?id=${session?.user?.uid}`,
      {
        method: "GET",
      }
    );
    const data = await res.json();

    if (data && data.data && data.data.length) {
      setAccount(data.data);
    }
  }

  useEffect(() => {
    getAllAccounts();
  }, []);
  return (
    <div className="min-h-screen flex justify-center flex-col items-center relative">
      <div className="flex justify-center flex-col items-center">
        <h1 className="text-white font-bold text-[54px] mt-[36px]">
          Who's Watching
        </h1>
        <ul></ul>
      </div>
    </div>
  );
}
