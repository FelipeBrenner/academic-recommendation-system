import type { IRecommendation } from "@interfaces";
import { Typography } from "@mui/material";
import * as Styles from "./InformationCard.styles";

interface IInformationCard {
	information: IRecommendation;
}

export const InformationCard = ({ information }: IInformationCard) => {
	return (
		<Styles.Card>
			<Typography variant="caption" color="gray">
				{information.titulo}
			</Typography>
			<Typography variant="body2">{information.descricao}</Typography>
		</Styles.Card>
	);
};
