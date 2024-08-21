import { openai } from "@services";
import { useQuery } from "@tanstack/react-query";

export const useGetTest = (content: string) => {
	const { data, isFetching, isError, refetch } = useQuery({
		queryKey: ["test"],
		queryFn: async () => {
			const completion = await openai.chat.completions.create({
				messages: [
					{ role: "system", content },
					{ role: "system", content: "Use no máximo 20 palavras." },
				],
				model: "gpt-4o-mini",
				temperature: 0.5,
				max_tokens: 30,
			});

			return completion.choices[0].message.content;
		},
		enabled: false,
	});

	return { data, isFetching, isError, refetch };
};
