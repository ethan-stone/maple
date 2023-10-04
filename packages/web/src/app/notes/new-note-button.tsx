"use client";

import { Button } from "@/components/ui/button";
import { useNewNote } from "@/hooks/new-note";

export default function NewNoteButton() {
  const { mutate: createNewNote, isPending, isError } = useNewNote();

  return (
    <Button onClick={() => createNewNote({ name: "this is a new note" })}>
      New Note
    </Button>
  );
}
