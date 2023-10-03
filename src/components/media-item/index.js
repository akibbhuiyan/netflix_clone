"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  PlusIcon,
  ChevronDownIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { useRouter, usePathname } from "next/navigation";
import { useContext } from "react";
import { GlobalContext } from "@/src/context";
import { useSession } from "next-auth/react";
import { getAllFavorites } from "@/src/utils";
const baseUrl = "https://image.tmdb.org/t/p/w500";

const MediaItem = ({
  media,
  searchView = false,
  similarMovieView = false,
  listView = false,
  title,
}) => {
  const {
    currentMediaInfoIdandType,
    setCurrentMediaInfoIdandType,
    showDetailsPopup,
    setShowDetailsPopup,
    loggedInAccount,
    setFavorites,
    similarMedia,
    searchResult,
    setSearchResult,
    setSimilarMedia,
    mediaData,
    setMediaData,
  } = useContext(GlobalContext);
  const pathName = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const updateFavorite = async () => {
    const res = await getAllFavorites(session?.user?.uid, loggedInAccount?._id);
    if (res) {
      setFavorites(res.map((item) => ({ ...item, addedToFavorite: true })));
    }
  };

  const handleAddFavorites = async (item) => {
    const { backdrop_path, poster_path, id, type } = item;

    const res = await fetch("/api/favorites/add-favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        backdrop_path,
        poster_path,
        movieId: id,
        type,
        uid: session.user?.uid,
        accountId: loggedInAccount?._id,
      }),
    });

    const data = await res.json();
    if (data && data.success) {
      if (pathName.includes("my-list")) {
        updateFavorite();
      }
    }
    if (searchView) {
      let updatedSearchResult = [...searchResult];
      const indexOfCurrentAddedMedia = updatedSearchResult.findIndex(
        (item) => item.id === id
      );
      updatedSearchResult[indexOfCurrentAddedMedia] = {
        ...updatedSearchResult[indexOfCurrentAddedMedia],
        addedToFavorite: true,
      };
      setSearchResult(updatedSearchResult);
    } else if (similarMovieView) {
      let updatedSimilarMovies = [...similarMedia];
      const indexOfCurrentAddedMedia = updatedSimilarMovies.findIndex(
        (item) => item.id === id
      );
      updatedSimilarMovies[indexOfCurrentAddedMedia] = {
        ...updatedSimilarMovies[indexOfCurrentAddedMedia],
        addedToFavorite: true,
      };
      setSimilarMedia(updatedSimilarMovies);
    } else {
      let updatedMedia = [...mediaData];
      const indexOfRowItem = updatedMedia.findIndex(
        (item) => item.title === title
      );
      let currentMediaArrayFromRow = updatedMedia[indexOfRowItem].medias;
      const indexOfCurrentMeadia = currentMediaArrayFromRow.findIndex(
        (item) => item.id === id
      );
      currentMediaArrayFromRow[indexOfCurrentMeadia] = {
        ...currentMediaArrayFromRow[indexOfCurrentMeadia],
        addedToFavorite: true,
      };
      setMediaData(updatedMedia);
    }

    console.log(data, "favorite");
  };
  const handleRemoveFavorites = async (item) => {
    const res = await fetch(`/api/favorites/remove-favorite?id=${item._id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (data && data.success) {
      updateFavorite();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <div className="relative cardWrapper h-28 min-w-[180px] cursor-pointer md:h-36 md:min-w-[260px] transform transition duration-500 hover:scale-110 hover:z-[999]">
        <Image
          src={`${baseUrl}${media?.backdrop_path || media?.poster_path}`}
          alt="Media"
          layout="fill"
          size="width"
          className="rounded-sm object-cover md:rounded hover:rounded-sm"
          onClick={() =>
            router.push(
              `/watch/${media.type}/${listView ? media.movieId : media.id}`
            )
          }
        />

        <div className="space-x-3 hidden absolute p-2 bottom-0 buttonWrapper">
          <button
            onClick={
              media?.addedToFavorite
                ? listView
                  ? () => handleRemoveFavorites(media)
                  : null
                : () => handleAddFavorites(media)
            }
            className={`${
              media?.addedToFavorite && !listView && "cursor-not-allowed"
            }cursor-pointer border flex p-2 items-center gap-x-2 rounded-full  text-sm font-semibold transition hover:opacity-90 border-white   bg-black opacity-75 text-black`}
          >
            {media?.addedToFavorite ? (
              <CheckIcon color="#ffffff" className="h-7 w-7" />
            ) : (
              <PlusIcon color="#ffffff" className="h-7 w-7" />
            )}
          </button>
          <button
            onClick={() => {
              setShowDetailsPopup(true);
              setCurrentMediaInfoIdandType({
                type: media?.type,
                id: listView ? media.movieId : media?.id,
              });
            }}
            className="cursor-pointer p-2 border flex items-center gap-x-2 rounded-full  text-sm font-semibold transition hover:opacity-90  border-white  bg-black opacity-75 "
          >
            <ChevronDownIcon color="#ffffff" className="h-7 w-7" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MediaItem;
