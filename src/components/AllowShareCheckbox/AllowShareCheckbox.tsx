import { Checkbox, Tooltip, Typography } from "@mui/material";
import * as Styles from "./AllowShareCheckbox.styles";

interface IAllowShareCheckbox {
  checked: boolean | undefined;
  onChange: (checked: boolean) => void;
}

export const AllowShareCheckbox = ({
  checked,
  onChange,
}: IAllowShareCheckbox) => {
  return (
    <Tooltip
      title={
        <Styles.TooltipCard>
          Ao habilitar este recurso, você autoriza o compartilhamento do seu
          histórico acadêmico, incluindo notas, forma de ingresso e média
          global, com outros usuários. Você passa a ter também a visibilidade
          destes dados dos outros usuários. Dessa forma, você pode se motivar a
          estudar e encontrar usuários com habilidades e desempenhos em
          disciplinas que você tem afinidade ou que precisa de ajuda,
          incentivando a troca de conhecimento e colaboração.
        </Styles.TooltipCard>
      }
    >
      <Styles.CheckboxControl
        label={
          <Typography variant="body2">
            Habilitar compartilhamento de dados e acesso aos dados dos outros
            usuários
          </Typography>
        }
        control={
          <Checkbox
            checked={checked}
            onChange={(event) => onChange(event.target.checked)}
            size="small"
          />
        }
      />
    </Tooltip>
  );
};
