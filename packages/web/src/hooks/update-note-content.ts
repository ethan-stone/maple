import { useMutation } from "@tanstack/react-query";
import { type ReqBody, type ResBody } from "@/app/api/notes/[id]/route";

export function useUpdateNoteContent() {
  return useMutation({
    mutationFn: async (body: ReqBody & { id: string }) => {
      const res = await fetch(`/api/notes/${body.id}`, {
        method: "POST",
        body: JSON.stringify({
          content: body.content,
        } satisfies ReqBody),
      });

      return (await res.json()) as ResBody;
    },
  });
}
