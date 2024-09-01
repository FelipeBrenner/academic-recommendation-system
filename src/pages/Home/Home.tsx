import { useGetTest } from "@api";
import { InformationCard, Pomodoro } from "@components";
import { LoadingButton } from "@mui/lab";
import { Grid } from "@mui/material";
import { informationCardResponse } from "mocks/responses";
import { useState } from "react";
import * as Styles from "./Home.styles";

export const Home = () => {
	const [text, setText] = useState("Diga que isso é um teste.");
	const { data, isFetching, refetch } = useGetTest(text);

	const handleClick = () => {
		refetch();
	};

	return (
		<Styles.Container maxWidth="xl">
			<Grid container spacing={3}>
				<Grid item sm={12} md>
					<Styles.Title variant="h4">Home</Styles.Title>
					<LoadingButton
						loading={isFetching}
						color="inherit"
						onClick={handleClick}
					>
						Clique para rodar a api do GPT
					</LoadingButton>
					<Styles.Input
						multiline
						value={text}
						onChange={(event) => setText(event.target.value)}
						label="Input para o GPT"
					/>
					<Styles.Text variant="body2">Resposta do GPT: {data}</Styles.Text>
				</Grid>
				<Grid item sm={12} md="auto">
					<Pomodoro />
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				{informationCardResponse.map((info) => (
					<Grid key={info.type} item xs={12} sm={6} md={4} xl={3}>
						<InformationCard information={info} />
					</Grid>
				))}
			</Grid>
		</Styles.Container>
	);
};
