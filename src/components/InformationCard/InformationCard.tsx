import type { ICardInformation } from "@interfaces";
import { Typography } from "@mui/material";
import * as Styles from "./InformationCard.styles";

interface IInformationCard {
	information: ICardInformation;
}

export const InformationCard = ({ information }: IInformationCard) => {
	return (
		<Styles.Card>
			<Typography variant="body2">{information.message}</Typography>
		</Styles.Card>
	);
};
