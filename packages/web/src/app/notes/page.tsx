import { Textarea } from "@/components/ui/textarea";
import NewNoteButton from "./new-note-button";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex grow w-full flex-col p-4 items-center justify-center">
        <NewNoteButton />
      </div>
      Notes
    </main>
  );
}
