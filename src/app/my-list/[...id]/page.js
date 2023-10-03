"use client";

import { GlobalContext } from "@/src/context";
import { getAllFavorites } from "@/src/utils";
import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import NavBar from "@/src/components/navBar";
import MediaItem from "@/src/components/media-item";
import CircleLoader from "@/src/components/circle-loader";
import UnAuthPage from "@/src/components/unAuthPage";
import ManageAcount from "@/src/components/manage-account";

const MyList = () => {
  const {
    favorites,
    setFavorites,
    loggedInAccount,
    pageLoader,
    setPageLoader,
  } = useContext(GlobalContext);
  const { data: session } = useSession();
  useEffect(() => {
    const extractFavorites = async () => {
      const data = await getAllFavorites(
        session?.user?.uid,
        loggedInAccount?._id
      );

      console.log(data);
      if (data) {
        setFavorites(data.map((item) => ({ ...item, addedToFavorite: true })));
        setPageLoader(false);
      }
    };
    extractFavorites();
  }, [loggedInAccount]);

  if (session === null) return <UnAuthPage />;
  if (loggedInAccount === null) return <ManageAcount />;
  if (pageLoader) return <CircleLoader />;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <NavBar />
      <div className="mt-[100px] space-y-0.5 md:space-y-2 px-4">
        <h2 className="cursor-pointer text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl">
          My List
        </h2>
        <div className="grid grid-cols-5 gap-3 items-center scrollbar-hide md:p-2">
          {favorites && favorites.length
            ? favorites.map((favoriteItem) => (
                <MediaItem
                  listView={true}
                  media={favoriteItem}
                  key={favoriteItem.id}
                />
              ))
            : "No favorites Added"}
        </div>
      </div>
    </motion.div>
  );
};
export default MyList;
