import { Tooltip, Typography } from "@mui/material";
import * as Styles from "./GenerationsCounter.styles";
import { useAuth } from "@contexts";
import { MAX_GENERATIONS } from "@constants";

const tooltipTitles = {
  over: "Seu limite de gerações acabou. Caso queira mais, entre em contato com o desenvolvedor!",
  notOver:
    "Se seu limite de gerações acabar e você precisar de mais, entre em contato com o desenvolvedor!",
};

export const GenerationsCounter = () => {
  const { user } = useAuth();

  const generations = user?.generations ?? 0;

  if (generations === 0 || user?.permission === "admin") return null;

  const hasGenerationsOver = generations === MAX_GENERATIONS;
  const title = hasGenerationsOver ? tooltipTitles.over : tooltipTitles.notOver;
  const generationsLeft = MAX_GENERATIONS - generations;

  return (
    <Styles.Container>
      <Tooltip title={<Styles.Card>{title}</Styles.Card>}>
        <Typography variant="body2" color="textSecondary">
          {`Gerações restantes: ${generationsLeft}`}
        </Typography>
      </Tooltip>
    </Styles.Container>
  );
};
