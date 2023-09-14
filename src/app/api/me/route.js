import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Thanakrit Yokart",
    studentId: "620612150",
  });
};
