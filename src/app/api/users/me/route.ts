import { tokenExtracter } from "@/helpers/tokenExtracter";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.schema";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const userID = await tokenExtracter(request);
    const userDetails = await User.findById({ _id: userID }).select(
      "-password"
    );

    return NextResponse.json({
      message: `User Found`,
      data: userDetails,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
