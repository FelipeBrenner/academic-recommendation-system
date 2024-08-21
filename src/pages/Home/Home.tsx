import { useGetTest } from "@api";
import { LoadingButton } from "@mui/lab";
import { Container } from "@mui/material";
import { useState } from "react";
import * as Styles from "./Home.styles";

export const Home = () => {
	const [text, setText] = useState("Diga que isso é um teste.");
	const { data, isFetching, refetch } = useGetTest(text);

	const handleClick = () => {
		refetch();
	};

	return (
		<Container>
			<Styles.Title variant="h4">Home</Styles.Title>
			<LoadingButton loading={isFetching} color="inherit" onClick={handleClick}>
				Clique para rodar a api do GPT
			</LoadingButton>
			<Styles.Input
				multiline
				value={text}
				onChange={(event) => setText(event.target.value)}
				label="Input para o GPT"
			/>
			<Styles.Text variant="body2">Resposta do GPT: {data}</Styles.Text>
		</Container>
	);
};
