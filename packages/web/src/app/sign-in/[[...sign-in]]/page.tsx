import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <SignIn redirectUrl="/notes" />
    </main>
  );
}
