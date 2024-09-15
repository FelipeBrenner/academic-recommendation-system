import { useGetGpt } from "@api";
import { InformationCard, Pomodoro } from "@components";
import type { IRecommendation } from "@interfaces";
import { LoadingButton } from "@mui/lab";
import { Grid } from "@mui/material";
import * as Styles from "./Home.styles";

export const Home = () => {
	const { data, isFetching, refetch } = useGetGpt();

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
						Clique para rodar a API do GPT
					</LoadingButton>
				</Grid>
				<Grid item sm={12} md="auto">
					<Pomodoro />
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				{Object.values(data.recommendations).map(
					(recommendation: IRecommendation) => (
						<Grid key={recommendation.titulo} item xs={12} sm={6} md={4} xl={3}>
							<InformationCard information={recommendation} />
						</Grid>
					),
				)}
			</Grid>
		</Styles.Container>
	);
};
