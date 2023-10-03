"use client";

import React, { useContext, useEffect } from "react";
import UnAuthPage from "../../components/unAuthPage";
import { useSession } from "next-auth/react";
import { GlobalContext } from "@/src/context";
import ManageAcount from "@/src/components/manage-account";
import CommonLayout from "@/src/components/commonLayout";
import { getTvorMoviesByGenre,getAllFavorites } from "@/src/utils";
import CircleLoader from "@/src/components/circle-loader";

const Tv = () => {
  const { data: session } = useSession();
  const {
    loggedInAccount,
    mediaData,
    setMediaData,
    pageLoader,
    setPageLoader,
  } = useContext(GlobalContext);

  useEffect(() => {
    const getAllMedias = async () => {
      const actionAdventure = await getTvorMoviesByGenre("tv", 10759);
      const crime = await getTvorMoviesByGenre("tv", 80);
      const comedy = await getTvorMoviesByGenre("tv", 35);
      const family = await getTvorMoviesByGenre("tv", 10751);
      const mystery = await getTvorMoviesByGenre("tv", 9648);
      const reality = await getTvorMoviesByGenre("tv", 10764);
      const scifiandFantasy = await getTvorMoviesByGenre("tv", 10765);
      const war = await getTvorMoviesByGenre("tv", 10768);
      const western = await getTvorMoviesByGenre("tv", 37);
      const dramaMovies = await getTvorMoviesByGenre("tv", 18);
      const allFavorites = await getAllFavorites(
        session?.user?.uid,
        loggedInAccount?._id
      );

      setMediaData(
        [
          {
            title: "Action and Adventure",
            medias: actionAdventure,
          },
          {
            title: "Crime",
            medias: crime,
          },
          {
            title: "Comedy",
            medias: comedy,
          },
          {
            title: "Family",
            medias: family,
          },
          {
            title: "Mystery",
            medias: mystery,
          },
          {
            title: "Reality",
            medias: reality,
          },
          {
            title: "Sci-Fi and Fantasy",
            medias: scifiandFantasy,
          },
          {
            title: "War",
            medias: war,
          },
          {
            title: "Western",
            medias: western,
          },
          {
            title: "Dramas",
            medias: dramaMovies,
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
        }))
      );
      setPageLoader(false);
    };
    getAllMedias();
  }, [loggedInAccount]);

  if (!session === null) return <UnAuthPage />;
  if (loggedInAccount === null) return <ManageAcount />;
  if (pageLoader) return <CircleLoader />;

  return (
    <main className="flex min-h-screen flex-col">
      <CommonLayout mediaData={mediaData} />
    </main>
  );
};

export default Tv;
