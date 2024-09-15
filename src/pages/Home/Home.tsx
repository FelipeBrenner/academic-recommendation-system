import { useGetGpt } from "@api";
import { InformationCard, Pomodoro } from "@components";
import { useAuth } from "@contexts";
import { recommendationsDatabase } from "@database";
import type { IRecommendations } from "@interfaces";
import { LoadingButton } from "@mui/lab";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Styles from "./Home.styles";

export const Home = () => {
	const { user } = useAuth();
	const { isFetching, refetch } = useGetGpt();
	const [recommendations, setRecommendations] =
		useState<IRecommendations | null>(null);

	useEffect(() => {
		const loadRecommendations = async () => {
			const recommendations = await recommendationsDatabase.getRecommentations(
				user!.id,
			);
			if (recommendations) {
				setRecommendations(recommendations);
			}
		};

		loadRecommendations();
	}, []);

	const handleClick = () => {
		refetch()
			.then((response) => {
				const recommendations = response.data?.recommendations;

				if (recommendations) {
					toast.success("Recomendações geradas com sucesso!");
					setRecommendations(recommendations);
					recommendationsDatabase.updateRecommentations({
						userId: user!.id,
						recommendations,
					});
				}
			})
			.catch(() => {
				toast.error("Erro ao gerar recomendações!");
			});
	};

	return (
		<Styles.Container maxWidth="xl">
			<Grid container spacing={3}>
				<Grid item sm={12} md>
					{/* <Styles.Title variant="h4">Home</Styles.Title> */}
					<LoadingButton
						loading={isFetching}
						color="inherit"
						onClick={handleClick}
					>
						Clique aqui para gerar suas recomendações
					</LoadingButton>
				</Grid>
				<Grid item sm={12} md="auto">
					<Pomodoro />
				</Grid>
			</Grid>
			{recommendations && (
				<Grid container spacing={3}>
					{Object.keys(recommendations)
						.sort()
						.map((key) => (
							<Grid
								key={recommendations[key].titulo}
								item
								xs={12}
								sm={6}
								md={4}
								xl={3}
							>
								<InformationCard information={recommendations[key]} />
							</Grid>
						))}
				</Grid>
			)}
		</Styles.Container>
	);
};
