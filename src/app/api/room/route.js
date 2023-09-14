import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { head } from "lodash";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const GET = async () => {
  readDB();
  return NextResponse.json({
    ok: true,
    rooms: DB.rooms,  
    totalRooms: DB.rooms.length
  });
};

export const POST = async (request) => {
  
  const rawAuthHeader = headers().get("authorization");
  const token = rawAuthHeader.split(" ")[1];

  let role = null;
  
  try {
    const payload = checkToken();
    
    role = payload.role;
  } catch (error) {
    return NextResponse.json(
    {
     ok: false,
     message: "Invalid token",
    },
    { status: 401 }
    );     
  }
  readDB();
  
  if (role === "ADMIN" || role === "SUPER_ADMIN"){
   return NextResponse.json(
   {
     ok: false,
     message: `Room ${DB.rooms.roomnName} already exists`,
   },
   { status: 400 }
  );
  }
  const roomId = nanoid();

  //call writeDB after modifying Database
  writeDB();
  
  return NextResponse.json({
    ok: true,
    roomId: DB.roomId,
    message: `Room ${"replace this with room name"} has been created`,
  });
};
