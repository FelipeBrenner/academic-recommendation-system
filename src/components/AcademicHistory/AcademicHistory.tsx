import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import * as Styles from "./AcademicHistory.styles";
import type { IGptResponse, IRecommendation } from "@interfaces";
import { RecommendationTooltip, Scrollbar } from "@components";

interface IAcademicHistory {
  gptResponse: IGptResponse | null;
}

export const AcademicHistory = ({ gptResponse }: IAcademicHistory) => {
  const {
    recommendations = {},
    academic_history = [],
    academic_info = [],
    lastUpdated,
  } = gptResponse || {};

  const recommendationsArray = Object.values<IRecommendation>(recommendations);
  const recommendationsLength =
    recommendationsArray.length > 2 ? recommendationsArray.length - 2 : 0;

  if (academic_history.length === 0)
    return (
      <Typography variant="h6">
        Dê entrada com seus dados e gere as recomendações!
      </Typography>
    );

  return (
    <Styles.Wrapper>
      {academic_info.length > 0 && (
        <Styles.InfoCard>
          {academic_info.map(({ title, info }) => (
            <Styles.InfoCardRow key={title}>
              <Typography variant="body2" fontWeight="bold">
                {title}
              </Typography>
              <Typography variant="body2">{info}</Typography>
            </Styles.InfoCardRow>
          ))}
        </Styles.InfoCard>
      )}
      <Styles.Header>
        <Typography variant="body2">{`Segue seu histórico acadêmico dado como entrada, juntamente com ${recommendationsLength} recomendações de técnicas de estudo identificadas pela plataforma!\nNesta mesma página você tem um recurso onde pode aplicar a técnica de Pomodoro e, em uma nova página disponibilizada, outro recurso para aplicar a técnica de Estabelecimento de Metas.`}</Typography>
      </Styles.Header>
      <Card>
        <Scrollbar>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome da Disciplina</TableCell>
                <Styles.TableCellCentered>Período</Styles.TableCellCentered>
                <Styles.TableCellCentered>
                  Avaliação Final
                </Styles.TableCellCentered>
              </TableRow>
            </TableHead>
            <TableBody>
              {academic_history.map((subject) => {
                const recommendation = recommendationsArray.find(
                  (r) => r.subject === subject.name
                );

                return (
                  <TableRow
                    key={subject.name}
                    sx={{
                      "&:last-child td": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell>{subject.name}</TableCell>
                    <Styles.TableCellCentered>
                      {subject.semester}
                    </Styles.TableCellCentered>
                    <Styles.TableCellCentered>
                      {subject.grade}
                      <RecommendationTooltip recommendation={recommendation} />
                    </Styles.TableCellCentered>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Scrollbar>
      </Card>
      <Styles.Footer>
        <Typography variant="caption" color="gray">
          {lastUpdated}
        </Typography>
      </Styles.Footer>
    </Styles.Wrapper>
  );
};
