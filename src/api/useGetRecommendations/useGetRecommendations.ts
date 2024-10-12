import type { IGptResponse } from "@interfaces";
import { openai } from "@services";
import { useQuery } from "@tanstack/react-query";
import type { TextContentBlock } from "openai/resources/beta/threads/messages.mjs";
import { toast } from "react-toastify";
import userContent from "./user.txt?raw";

export const useGetRecommendations = (files: Array<{ id: string }>) => {
  const { isFetching, refetch } = useQuery<IGptResponse>({
    queryKey: ["recommendations"],
    queryFn: async () => {
      const thread = await openai.beta.threads.create();

      await openai.beta.threads.messages.create(thread.id, {
        role: "user",
        content: userContent,
        attachments: files.map((file) => ({
          file_id: file.id,
          tools: [{ type: "code_interpreter" }],
        })),
      });

      const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
        assistant_id: import.meta.env.VITE_OPENAI_ASSISTANT_ID,
      });

      if (run.status === "completed") {
        const messages = await openai.beta.threads.messages.list(run.thread_id);

        try {
          const text =
            (messages.data[0].content[0] as TextContentBlock)?.text.value ?? "";

          if (text.includes("recommendations")) return JSON.parse(text);

          throw new Error(text);
        } catch (error: any) {
          console.error(error);
          toast.error(
            "Houve um erro ao gerar as recomendações. Consulte o desenvolvedor!"
          );
        }
      }

      return {} as IGptResponse;
    },
    enabled: false,
  });

  return { isFetching, refetch };
};
