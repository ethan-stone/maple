import { Textarea } from "@/components/ui/textarea";
import { db, eq, notes } from "@/server/db/client";

export default async function Page({ params }: { params: { id: string } }) {
  const note = (
    await db.select().from(notes).where(eq(notes.id, params.id))
  )[0];

  if (note === undefined) return <div>404</div>;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex grow w-full flex-col p-4 items-center justify-center">
        <Textarea
          defaultValue={note.content}
          className="flex resize-none w-1/2 grow focus-visible:ring-0"
        />
      </div>
    </main>
  );
}
