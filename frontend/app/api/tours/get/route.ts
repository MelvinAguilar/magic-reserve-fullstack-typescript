import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const url = process.env.NEXT_PUBLIC_API_URL + "/tours";
  const response = await fetch(url);
  
  return NextResponse.json(await response.json());
}
