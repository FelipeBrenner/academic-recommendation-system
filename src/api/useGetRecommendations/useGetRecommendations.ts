import type { IGptResponse } from "@interfaces";
import { openai } from "@services";
import { useQuery } from "@tanstack/react-query";
import type { TextContentBlock } from "openai/resources/beta/threads/messages.mjs";
import { useEffect, useState } from "react";
import systemContent from "./system.txt?raw";
import userContent from "./user.txt?raw";

export const useGetRecommendations = (files: Array<{ id: string }>) => {
	const [threadId, setThreadId] = useState("");

	useEffect(() => {
		const createThread = async () => {
			const thread = await openai.beta.threads.create({
				messages: [
					{
						role: "assistant",
						content: systemContent,
					},
				],
			});
			setThreadId(thread.id);
		};

		createThread();
	}, []);

	const { isFetching, refetch } = useQuery<IGptResponse>({
		queryKey: ["recommendations"],
		queryFn: async () => {
			await openai.beta.threads.messages.create(threadId, {
				role: "user",
				content: userContent,
				attachments: files.map((file) => ({
					file_id: file.id,
					tools: [{ type: "code_interpreter" }],
				})),
			});

			const run = await openai.beta.threads.runs.createAndPoll(threadId, {
				assistant_id: import.meta.env.VITE_OPENAI_ASSISTANT_ID,
			});

			if (run.status === "completed") {
				const messages = await openai.beta.threads.messages.list(run.thread_id);

				return JSON.parse(
					(messages.data[0].content[0] as TextContentBlock)?.text.value ?? "",
				);
			}

			return {} as IGptResponse;
		},
		enabled: false,
	});

	return { isFetching, refetch };
};
