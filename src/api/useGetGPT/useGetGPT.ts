import { openai } from "@services";
import { useQuery } from "@tanstack/react-query";
import systemContent from "./system.txt?raw";
import userContent from "./user.json";

export const useGetGPT = () => {
	const { data, isFetching, isError, refetch } = useQuery({
		queryKey: ["gpt"],
		queryFn: async () => {
			const completion = await openai.chat.completions.create({
				model: "gpt-4o-mini",
				messages: [
					{ role: "system", content: systemContent },
					{ role: "user", content: JSON.stringify(userContent) },
				],
				temperature: 1,
				max_tokens: 16383,
				response_format: {
					type: "json_object",
				},
			});

			return completion.choices[0].message.content;
		},
		enabled: false,
	});

	return { data, isFetching, isError, refetch };
};
