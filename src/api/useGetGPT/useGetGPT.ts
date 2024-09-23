import type { IGptResponse } from "@interfaces";
import { openai } from "@services";
import { useQuery } from "@tanstack/react-query";
import systemContent from "./system.txt?raw";
import userContent from "./user2.json";

export const useGetGpt = () => {
	const { isFetching, isError, refetch } = useQuery<IGptResponse>({
		queryKey: ["gpt"],
		queryFn: async () => {
			const completion = await openai.chat.completions.create({
				model: "gpt-4o-mini",
				messages: [
					{ role: "system", content: systemContent },
					{ role: "user", content: JSON.stringify(userContent) },
					{ role: "assistant", content: "" },
				],
				temperature: 1,
				max_tokens: 16383,
				response_format: {
					type: "json_object",
				},
			});

			return JSON.parse(completion.choices[0].message.content ?? "");
		},
		enabled: false,
	});

	return {
		isFetching,
		isError,
		refetch,
	};
};
