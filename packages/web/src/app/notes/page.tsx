import NewNoteButton from "./new-note-button";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex w-full grow flex-col items-center justify-center p-4">
        <NewNoteButton />
      </div>
      Notes
    </main>
  );
}
