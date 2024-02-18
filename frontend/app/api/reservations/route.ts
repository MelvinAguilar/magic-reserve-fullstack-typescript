import { NextResponse } from "next/server";

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
