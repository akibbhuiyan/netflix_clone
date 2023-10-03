"use client";

import React, { useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import UnAuthPage from "@/src/components/unAuthPage";
import { GlobalContext } from "@/src/context";
import ManageAcount from "@/src/components/manage-account";
import CommonLayout from "@/src/components/commonLayout";
import {
  getPopularMedia,
  getTopRatedMedia,
  getTrendingMedia,
  getAllFavorites,
} from "@/src/utils";
import CircleLoader from "@/src/components/circle-loader";

const Browse = () => {
  const {
    loggedInAccount,
    mediaData,
    setMediaData,
    pageLoader,
    setPageLoader,
  } = useContext(GlobalContext);
  const { data: session } = useSession();

  useEffect(() => {
    const getMediaData = async () => {
      const tendingTvShows = await getTrendingMedia("tv");
      const topRatedTvShows = await getTopRatedMedia("tv");
      const popularTvShows = await getPopularMedia("tv");

      const tendingMovies = await getTrendingMedia("movie");
      const topRatedMovies = await getTopRatedMedia("movie");
      const popularMovies = await getPopularMedia("movie");
      const allFavorites = await getAllFavorites(
        session?.user?.uid,
        loggedInAccount?._id
      );

      setMediaData([
        ...[
          {
            title: "Trending TV Shows",
            medias: tendingTvShows,
          },
          {
            title: "Top Rates TV Shows",
            medias: topRatedTvShows,
          },
          {
            title: "Popular TV Shows",
            medias: popularTvShows,
          },
        ].map((item) => ({
          ...item,
          medias: item.medias.map((mediaItem) => ({
            ...mediaItem,
            type: "tv",
            addedToFavorite:
              allFavorites && allFavorites.length
                ? allFavorites.map((fav) => fav.movieId).indexOf(mediaItem.id) >
                  -1
                : false,
          })),
        })),
        ...[
          {
            title: "Trending Movies",
            medias: tendingMovies,
          },
          {
            title: "Top Rated Movies",
            medias: topRatedMovies,
          },
          {
            title: "Popular Movies",
            medias: popularMovies,
          },
        ].map((item) => ({
          ...item,
          medias: item.medias.map((mediaItem) => ({
            ...mediaItem,
            type: "movie",
            addedToFavorite:
              allFavorites && allFavorites.length
                ? allFavorites.map((fav) => fav.movieId).indexOf(mediaItem.id) >
                  -1
                : false,
          })),
        })),
      ]);
      setPageLoader(false);
    };

    getMediaData();
  }, []);

  if (!session) return <UnAuthPage />;
  if (loggedInAccount === null) return <ManageAcount />;
  if (pageLoader) return <CircleLoader />;

  return (
    <main className="flex min-h-screen flex-col">
      <CommonLayout mediaData={mediaData} />
    </main>
  );
};

export default Browse;
