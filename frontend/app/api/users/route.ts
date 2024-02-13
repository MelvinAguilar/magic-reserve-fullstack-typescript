import { NextResponse } from "next/server";

export async function GET(req: Request, _res: NextResponse) {
  const url = process.env.NEXT_PUBLIC_API_URL + "/users/";
  const headerAuth = req.headers.get("Authorization");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: headerAuth || "",
    },
  });

  return NextResponse.json(await response.json());
}

export async function PATCH(req: Request, _res: NextResponse) {
  const data = await req.json();

  const url = process.env.NEXT_PUBLIC_API_URL + "/users/" + data.id;

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

export async function DELETE(req: Request, _res: NextResponse) {
  const data = await req.json();

  const url = process.env.NEXT_PUBLIC_API_URL + "/users/" + data.id;

  const headerAuth = req.headers.get("Authorization");

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: headerAuth || "",
    },
  });

  return NextResponse.json(await response.json());
}
