"use client";

import { useSession } from "next-auth/react";
import React, { useContext, useEffect } from "react";
import UnAuthPage from "../../../components/unAuthPage";
import { GlobalContext } from "@/src/context";
import ManageAcount from "@/src/components/manage-account";
import { useParams } from "next/navigation";
import { getAllFavorites, getTvorMovieSearchResults } from "@/src/utils";
import CircleLoader from "@/src/components/circle-loader";
import { motion } from "framer-motion";
import NavBar from "@/src/components/navBar";
import MediaItem from "@/src/components/media-item";

const Search = () => {
  const {
    loggedInAccount,
    searchResult,
    pageLoader,
    setPageLoader,
    setSearchResult,
  } = useContext(GlobalContext);

  const { data: session } = useSession();
  const params = useParams();

  useEffect(() => {
    const getSearchResults = async () => {
      const tvShows = await getTvorMovieSearchResults("tv", params.query);
      const movies = await getTvorMovieSearchResults("movie", params.query);
      const allFavorites = await getAllFavorites(
        session?.user?.uid,
        loggedInAccount?._id
      );
      setSearchResult([
        ...tvShows
          .filter(
            (item) => item.backdrop_path !== null && item.poster_path !== null
          )
          .map((tvshowItem) => ({
            ...tvshowItem,
            type: "tv",
            addedToFavorite:
              allFavorites && allFavorites.length
                ? allFavorites
                    .map((fav) => fav.movieId)
                    .indexOf(tvshowItem.id) > -1
                : false,
          })),

        ...movies
          .filter(
            (item) => item.backdrop_path !== null && item.poster_path !== null
          )
          .map((moviesItem) => ({
            ...moviesItem,
            type: "movie",
            addedToFavorite:
              allFavorites && allFavorites.length
                ? allFavorites
                    .map((fav) => fav.movieId)
                    .indexOf(moviesItem.id) > -1
                : false,
          })),
      ]);
      setPageLoader(false);
    };
    getSearchResults();
  }, [loggedInAccount]);

  if (!session === null) return <UnAuthPage />;
  if (loggedInAccount === null) return <ManageAcount />;
  if (pageLoader) return <CircleLoader />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <NavBar />
      <div className="space-y-0.5 mt-[100px] md:space-y-2 px-4">
        <h2 className="cursor-pointer text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl">
          Showing Result for {decodeURI(params.query)}
        </h2>
        <div className="grid grid-cols-5 gap-3 items-center scrollbar-hide md:p-2">
          {searchResult && searchResult.length
            ? searchResult.map((searchItem) => (
                <MediaItem
                  searchView={true}
                  media={searchItem}
                  key={searchItem.id}
                />
              ))
            : null}
        </div>
      </div>
    </motion.div>
  );
};

export default Search;
