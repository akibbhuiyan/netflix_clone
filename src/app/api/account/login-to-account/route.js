import connectToDB from "@/src/database";
import Account from "@/src/models/account";
import { compare } from "bcryptjs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();
    const { uid, accountId, pin } = await req.json();
    const getCurrentAccount = await Account.findOne({ _id: accountId, uid });
    if (!getCurrentAccount) {
      return NextResponse.json({
        success: false,
        message: "Account not found",
      });
    }
    const checkPin = await compare(pin, getCurrentAccount.pin);
    if (checkPin) {
      return NextResponse.json({
        success: true,
        message: "Login successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Invalid pin",
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
