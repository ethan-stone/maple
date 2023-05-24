import { supabase } from "@/server/db/client";
import { randomUUID } from "crypto";
import { Configuration, OpenAIApi } from "openai";
import { z } from "zod";

const reqBody = z.object({
  content: z.string(),
});

const openai = new OpenAIApi(new Configuration({}));

export async function POST(req: Request) {
  const reqBodyParseResult = await reqBody.spa(req.body);

  if (!reqBodyParseResult.success) {
    return new Response("Invalid body", { status: 400 });
  }

  const body = reqBodyParseResult.data;

  const embedding = await openai.createEmbedding({
    input: body.content,
    model: "text-embedding-ada-002",
  });

  const res = await supabase
    .from("documents")
    .insert({
      id: randomUUID(),
      embedding: embedding.data.data[0].embedding,
      content: body.content,
    })
    .select();

  return res.data;
}
