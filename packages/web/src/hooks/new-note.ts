import { useMutation } from "@tanstack/react-query";
import { type ReqBody, type ResBody } from "@/app/api/notes/route";

export function useNewNote() {
  return useMutation({
    mutationFn: async (body: ReqBody) => {
      const res = await fetch("/api/notes", {
        method: "POST",
        body: JSON.stringify(body),
      });

      return (await res.json()) as ResBody;
    },
  });
}
