import { NextResponse } from "next/server";

export async function PATCH(req: Request, _res: NextResponse) {
  const data = await req.json();

  const url = process.env.NEXT_PUBLIC_API_URL + "/users/update-me";

  const headerAuth = req.headers.get("Authorization");

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: headerAuth || "",
    },
    body: JSON.stringify(data),
  });

  return NextResponse.json(await response.json());
}
