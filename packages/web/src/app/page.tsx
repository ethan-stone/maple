import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <UserButton />
      <Link href="/sign-in">Sign In</Link>
    </main>
  );
}
