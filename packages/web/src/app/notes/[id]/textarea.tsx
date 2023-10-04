"use client";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateNoteContent } from "@/hooks/update-note-content";
import { debounce } from "@/utils/debounce";

export default function TextArea({
  id,
  defaultContent,
}: {
  id: string;
  defaultContent: string;
}) {
  const { mutate: updateNoteContent } = useUpdateNoteContent();

  const debounceUpdateNoteContent = debounce(updateNoteContent, 200);

  return (
    <Textarea
      defaultValue={defaultContent}
      onChange={(e) =>
        debounceUpdateNoteContent({ id: id, content: e.target.value })
      }
      className="flex resize-none w-1/2 grow focus-visible:ring-0"
    />
  );
}
