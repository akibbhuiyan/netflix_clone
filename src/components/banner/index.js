"use client";

import { GlobalContext } from "@/src/context";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { IoMdInformationCircleOutline } from "react-icons/io";

const baseUrl = "https://image.tmdb.org/t/p/original";

const Banner = ({ medias }) => {
  const { setCurrentMediaInfoIdandType, setShowDetailsPopup } =
    useContext(GlobalContext);
  const router = useRouter();
  const createRandomMedia =
    medias && medias?.length
      ? medias[Math.floor(Math.random() * medias.length)]
      : null;
  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12 lg:pl-24">
      <div className="absolute top-0 left-0 h-[95vh] w-screen -z-10">
        <Image
          src={`${baseUrl}/${
            createRandomMedia?.backdrop_path || createRandomMedia?.poster_path
          }`}
          alt="banner"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute w-full z-19 top-0 left-0 right-0 bg-black/50 h-full" />
        <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100  to-[transparent] bottom-0 z-20" />{" "}
      </div>
      <h1 className="text-2xl md:text-4xl lg:text-7xl font-bold">
        {createRandomMedia?.title ||
          createRandomMedia?.name ||
          createRandomMedia?.original_name}
      </h1>
      <p className="max-w-xs text-shadow-md text-xs md:max-w-lg md:text-lg lg:max-w-2xl line-clamp-5">
        {createRandomMedia?.overview}
      </p>
      <div className="flex space-x-3 ">
        <button
          onClick={() =>
            router.push(
              `/watch/${createRandomMedia?.type}/${createRandomMedia?.id}`
            )
          }
          className="cursor-pointer flex items-center gap-x-2 rounded px-5 py-1.5 text-sm font-semibold transition hover:opacity-75 md:py-2.5 md:px-8 md:text-xl bg-white text-black"
        >
          <AiFillPlayCircle className="w-4 h-4 text-black md:h-7 md:w-7 cursor-pointer" />
          Play
        </button>
        <button
          onClick={() => {
            setShowDetailsPopup(true);
            setCurrentMediaInfoIdandType({
              type: createRandomMedia?.type,
              id: createRandomMedia?.id,
            });
          }}
          className="cursor-pointer flex items-center gap-x-2 rounded px-5 py-1.5 text-sm font-semibold transition hover:opacity-75 md:py-2.5 md:px-8 md:text-xl bg-[gray]/70"
        >
          <IoMdInformationCircleOutline className="w-5 h-5  md:h-8 md:w-8 cursor-pointer" />
          More Info
        </button>
      </div>
    </div>
  );
};

export default Banner;
