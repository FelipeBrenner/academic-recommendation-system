import { AcademicHistory, Pomodoro, RecommendationModal } from "@components";
import { Grid } from "@mui/material";
import * as Styles from "./Home.styles";
import { useGptResponse } from "@hooks";

export const Home = () => {
  const { gptResponse, setGptResponse } = useGptResponse();

  const hasRecommendations = !!gptResponse?.recommendations;

  return (
    <Styles.Container maxWidth="xl">
      {gptResponse && (
        <Grid container spacing={3}>
          <Grid
            item
            sm={12}
            md
            style={{
              overflow: "auto",
            }}
          >
            <AcademicHistory gptResponse={gptResponse} />
          </Grid>
          <Grid item sm={12} md="auto">
            <Pomodoro
              recommendation={gptResponse?.recommendations?.metodo_pomodoro}
            />
          </Grid>
        </Grid>
      )}
      <RecommendationModal
        hasRecommendations={hasRecommendations}
        setGptResponse={setGptResponse}
      />
    </Styles.Container>
  );
};
