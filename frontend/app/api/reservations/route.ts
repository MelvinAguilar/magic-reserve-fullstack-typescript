import { NextResponse } from "next/server";

export async function GET(req: Request, _res: NextResponse) {
  const url = process.env.NEXT_PUBLIC_API_URL + "/reservations/my-reservations/";

  const headerAuth = req.headers.get("Authorization");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: headerAuth || "",
    },
  });

  return NextResponse.json(await response.json());
}


export async function POST(req: Request, _res: NextResponse) {
  const data = await req.json();

  const url = process.env.NEXT_PUBLIC_API_URL + "/reservations/";

  const headerAuth = req.headers.get("Authorization");

  console.log("data", JSON.stringify(data));

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: headerAuth || "",
    },
    body: JSON.stringify(data),
  });

  return NextResponse.json(await response.json());
}
