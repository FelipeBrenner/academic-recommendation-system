import { RecommendationCard } from "@components";
import type { IRecommendation } from "@interfaces";
import * as Styles from "./RecommendationTooltip.styles";

interface IRecommendationTooltip {
	recommendation?: IRecommendation;
}

export const RecommendationTooltip = ({
	recommendation,
}: IRecommendationTooltip) => {
	if (!recommendation) return null;

	return (
		<Styles.InfoTooltip
			title={
				<Styles.InfoTitle>
					<RecommendationCard recommendation={recommendation} />
				</Styles.InfoTitle>
			}
		>
			<Styles.InfoIcon />
		</Styles.InfoTooltip>
	);
};
