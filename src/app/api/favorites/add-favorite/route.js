import connectToDB from "@/src/database";
import Favorites from "@/src/models/Favorites";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();
    const data = await req.json();

    const isFavoriteAlreadyExist = await Favorites.find({
      uid: data.uid,
      movieId: data.movieId,
      accountId: data.accountId,
    });
    const allAFavorite = await Favorites.find({});

    if (isFavoriteAlreadyExist && isFavoriteAlreadyExist.length > 0) {
      return NextResponse.json({
        success: false,
        message: "Tjis is already added to list",
      });
    }

    const newlyAddedFavorite = await Favorites.create(data);
    if (newlyAddedFavorite) {
      return NextResponse.json({
        success: true,
        message: "Added to List successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
