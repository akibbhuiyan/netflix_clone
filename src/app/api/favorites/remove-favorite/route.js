import connectToDB from "@/src/database";
import Favorites from "@/src/models/Favorites";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Favorite Item ID is required",
      });
    }
    const deleteFavoriteItem = await Favorites.findByIdAndDelete(id);
    if (deleteFavoriteItem) {
      return NextResponse.json({
        success: true,
        message: "Removed From your List",
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
