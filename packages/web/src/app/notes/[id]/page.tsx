import { Textarea } from "@/components/ui/textarea";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex grow w-full flex-col p-4 items-center justify-center">
        <Textarea className="flex resize-none w-1/2 grow focus-visible:ring-0" />
      </div>
      Notes
    </main>
  );
}
