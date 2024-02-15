import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Unauthorized</h1>
      <p className="text-gray-500">You are not authorized to view this page</p>
      <Link href="/" className="mt-4 text-blue-500">
        Go back to home
      </Link>
    </div>
  );
}
