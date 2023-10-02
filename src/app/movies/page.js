"use client";

import React, { useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import UnAuthPage from "../../components/unAuthPage";
import { GlobalContext } from "@/src/context";
import ManageAcount from "@/src/components/manage-account";
import CommonLayout from "@/src/components/commonLayout";
import CircleLoader from "@/src/components/circle-loader";
import { getTvorMoviesByGenre } from "@/src/utils";

const Movies = () => {
  const {
    loggedInAccount,
    mediaData,
    setMediaData,
    pageLoader,
    setPageLoader,
  } = useContext(GlobalContext);
  const { data: session } = useSession();
  console.log(mediaData);
  useEffect(() => {
    const getAllMedias = async () => {
      const action = await getTvorMoviesByGenre("movie", 28);
      const adventure = await getTvorMoviesByGenre("movie", 12);
      const crime = await getTvorMoviesByGenre("movie", 80);
      const comedy = await getTvorMoviesByGenre("movie", 35);
      const family = await getTvorMoviesByGenre("movie", 10751);
      const mystery = await getTvorMoviesByGenre("movie", 9648);
      const romance = await getTvorMoviesByGenre("movie", 10749);
      const scifiAndFantasy = await getTvorMoviesByGenre("movie", 878);
      const war = await getTvorMoviesByGenre("movie", 10752);
      const history = await getTvorMoviesByGenre("movie", 36);
      const drama = await getTvorMoviesByGenre("movie", 18);
      const thriller = await getTvorMoviesByGenre("movie", 53);
      const horror = await getTvorMoviesByGenre("movie", 27);

      setMediaData(
        [
          {
            title: "Action",
            medias: action,
          },
          {
            title: "Adventure",
            medias: adventure,
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
            title: "Horror",
            medias: horror,
          },
          {
            title: "History",
            medias: history,
          },
          {
            title: "Romance",
            medias: romance,
          },
          {
            title: "Sci-Fi and Fantasy",
            medias: scifiAndFantasy,
          },
          {
            title: "Thriller",
            medias: thriller,
          },
          {
            title: "War",
            medias: war,
          },
          {
            title: "Dramas",
            medias: drama,
          },
        ].map((item) => ({
          ...item,
          medias: item.medias.map((mediaItem) => ({
            ...mediaItem,
            type: "movie",
            addedToFavorite: false,
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

export default Movies;
