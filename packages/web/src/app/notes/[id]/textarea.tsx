"use client";
import { Textarea } from "@/components/ui/textarea";
import { debounce } from "@/utils/debounce";

export default function TextArea({
  id,
  defaultContent,
}: {
  id: string;
  defaultContent: string;
}) {
  const debounceUpdateNoteContent = debounce(console.log, 200);

  return (
    <Textarea
      defaultValue={defaultContent}
      onChange={(e) =>
        debounceUpdateNoteContent({ id: id, content: e.target.value })
      }
      className="flex w-1/2 grow resize-none focus-visible:ring-0"
    />
  );
}
