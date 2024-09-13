import { useGetGPT } from "@api";
import { InformationCard, Pomodoro } from "@components";
import { LoadingButton } from "@mui/lab";
import { Grid } from "@mui/material";
import { informationCardResponse } from "mocks/responses";
import * as Styles from "./Home.styles";

export const Home = () => {
	const { data, isFetching, refetch } = useGetGPT();

	const handleClick = () => {
		refetch();
	};

	console.log("data: ", data);

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
						Clique para rodar a API do GPT
					</LoadingButton>
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
