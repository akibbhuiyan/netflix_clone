import mongoose from "mongoose";

const NewFavoriteSchema = new mongoose.Schema(
  {
    uid: String,
    accountId: String,
    backdrop_path: String,
    poster_path: String,
    movieId: Number,
    type: String,
  },
  { timestamps: true }
);

const Favorites =
  mongoose.models.Favorites || mongoose.model("Favorites", NewFavoriteSchema);

export default Favorites;
