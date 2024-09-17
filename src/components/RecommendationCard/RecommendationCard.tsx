import type { IRecommendation } from "@interfaces";
import { Typography } from "@mui/material";
import * as Styles from "./RecommendationCard.styles";

interface IRecommendationCard {
	recommendation: IRecommendation;
}

export const RecommendationCard = ({ recommendation }: IRecommendationCard) => {
	return (
		<Styles.Card>
			<Typography variant="caption" color="gray">
				{recommendation.titulo}
			</Typography>
			<Typography variant="body2">{recommendation.descricao}</Typography>
		</Styles.Card>
	);
};
