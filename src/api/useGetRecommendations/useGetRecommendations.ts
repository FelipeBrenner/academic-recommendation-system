import type { IGptResponse } from "@interfaces";
import { openai } from "@services";
import { useMutation } from "@tanstack/react-query";
import type { TextContentBlock } from "openai/resources/beta/threads/messages.mjs";
import userContent from "./user.txt?raw";

export const useGetRecommendations = () => {
  const { mutate } = useMutation({
    mutationFn: async (files: Array<{ id: string }>): Promise<IGptResponse> => {
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

      try {
        if (run.status === "completed") {
          const messages = await openai.beta.threads.messages.list(
            run.thread_id
          );

          const text =
            (messages.data[0].content[0] as TextContentBlock)?.text.value ?? "";

          const hasNoRecognizeAcademicHistory = text.includes("Fake Name");

          if (
            text.includes("recommendations") &&
            !hasNoRecognizeAcademicHistory
          )
            return JSON.parse(text);

          throw new Error(text);
        }

        if (run.status === "failed") {
          throw new Error(run.last_error?.message);
        }
      } catch (error: any) {
        console.error(error);
      }

      return {} as IGptResponse;
    },
  });

  return { mutate };
};
