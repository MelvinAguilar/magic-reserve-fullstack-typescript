import { NextResponse } from "next/server";

export async function POST(req: Request, _res: NextResponse) {
  const data = await req.json();
  
  const url = process.env.NEXT_PUBLIC_API_URL + "/users/forgot-password";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return NextResponse.json(await response.json());
}
