import { db, eq, notes } from "@/server/db/client";
import TextArea from "./textarea";

export default async function Page({ params }: { params: { id: string } }) {
  const note = (
    await db.select().from(notes).where(eq(notes.id, params.id))
  )[0];

  if (note === undefined) return <div>404</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex w-full grow flex-col items-center justify-center p-4">
        <TextArea id={note.id} defaultContent={note.content} />
      </div>
    </main>
  );
}
