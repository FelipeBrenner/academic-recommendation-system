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
  const recommendationsLength = academic_history.reduce((acc, subject) => {
    return (
      acc +
      (recommendationsArray.some((r) => r.subject === subject.name) ? 1 : 0)
    );
  }, 0);

  if (academic_history.length === 0) return null;

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
        <Typography variant="body2">{`Abaixo está o seu histórico acadêmico fornecido como entrada, acompanhado de ${recommendationsLength} recomendações de técnicas de estudo identificadas pela plataforma.\nNesta página, você também encontra uma ferramenta para aplicar a técnica Pomodoro, e em uma nova página, está disponível um recurso para aplicar a técnica de Estabelecimento de Metas.`}</Typography>
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
