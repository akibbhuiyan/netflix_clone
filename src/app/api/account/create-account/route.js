import connectToDB from "@/src/database";
import Account from "@/src/models/account";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();
    const { uid, name, pin } = await req.json();

    const isAccountAlreadyExist = await Account.find({ uid, name });
    const allAccount = await Account.find({});

    if (isAccountAlreadyExist && isAccountAlreadyExist.length > 0) {
      return NextResponse.json({
        success: false,
        message: "Account already exist",
      });
    }
    if (allAccount && allAccount.length === 4) {
      return NextResponse.json({
        success: false,
        message: "Account limit reached (4)",
      });
    }
    const hasPin = await hash(pin, 12);
    const newlyCreatedAccount = await Account.create({
      name,
      pin: hasPin,
      uid,
    });
    if (newlyCreatedAccount) {
      return NextResponse.json({
        success: true,
        message: "Account created successfully",
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
