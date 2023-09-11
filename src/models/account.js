import mongoose from "mongoose";

const newAccountSchema = new mongoose.Schema(
  {
    uid: String,
    name: String,
    pin: String,
  },
  { timesStamps: true }
);

const Account =
  mongoose.model.Account || mongoose.model("Account", newAccountSchema);
export default Account;
