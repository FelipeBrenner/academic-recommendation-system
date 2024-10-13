import { useFiles, useGetRecommendations } from "@api";
import { AcademicHistory, Pomodoro } from "@components";
import { useAuth } from "@contexts";
import { LoadingButton } from "@mui/lab";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import * as Styles from "./Home.styles";
import { gptResponseDatabase } from "@database";
import { useGptResponse } from "@hooks";

export const Home = () => {
  const { user } = useAuth();
  const { files, create } = useFiles();
  const { isFetching, refetch } = useGetRecommendations(files);
  const { gptResponse, setGptResponse } = useGptResponse();

  const handleClick = () => {
    refetch().then(({ data: gptResponse }) => {
      if (gptResponse?.recommendations) {
        toast.success("Recomendações geradas com sucesso!");
        setGptResponse(gptResponse);
        gptResponseDatabase.updateGptResponse({
          userId: user!.id,
          gptResponse,
        });
      }
    });
  };

  const handleClickFile = () => {
    const loadFiles = async () => {
      create(
        "/Users/foliveib/ai-projects/academic-recommendation-system/files/historico-escolar.pdf"
      );
    };

    loadFiles();
  };

  return (
    <Styles.Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item sm={12} md>
          <AcademicHistory gptResponse={gptResponse} />
        </Grid>
        <Grid item sm={12} md="auto">
          <Pomodoro
            recommendation={gptResponse?.recommendations?.metodo_pomodoro}
          />
        </Grid>
      </Grid>
      <LoadingButton loading={isFetching} color="inherit" onClick={handleClick}>
        Gerar recomendações
      </LoadingButton>
      <LoadingButton color="inherit" onClick={handleClickFile}>
        Fazer upload do arquivo
      </LoadingButton>
    </Styles.Container>
  );
};
