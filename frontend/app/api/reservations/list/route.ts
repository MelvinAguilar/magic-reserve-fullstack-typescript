import { NextResponse } from "next/server";

export async function GET(req: Request, _res: NextResponse) {
  const url = process.env.NEXT_PUBLIC_API_URL + "/reservations/";
  const headerAuth = req.headers.get("Authorization");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: headerAuth || "",
    },
  });

  return NextResponse.json(await response.json());
}