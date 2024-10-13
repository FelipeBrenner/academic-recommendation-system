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
  const { recommendations = {}, academic_history = [] } = gptResponse || {};

  if (academic_history.length === 0)
    return (
      <Typography variant="h6">
        Dê entrada com seus dados e gere as recomendações!
      </Typography>
    );

  return (
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
              const recommendation = Object.values<IRecommendation>(
                recommendations
              ).find((r) => r.subject === subject.name);

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
  );
};
