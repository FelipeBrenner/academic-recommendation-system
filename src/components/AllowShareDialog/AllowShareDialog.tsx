import { Dialog, DialogActions, DialogContent } from "@mui/material";
import { AllowShareCheckbox } from "@components";
import { useState } from "react";
import * as Styles from "./AllowShareDialog.styles";
import { useAuth } from "@contexts";
import { LoadingButton } from "@mui/lab";

interface IAllowShareDialog {
  isOpenDialog: boolean;
  handleCloseDialog: () => void;
}

export const AllowShareDialog = ({
  isOpenDialog,
  handleCloseDialog,
}: IAllowShareDialog) => {
  const { updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [allowShareData, setAllowShareData] = useState<boolean | undefined>(
    false
  );

  const handleChangeCheckbox = (checked: boolean) => {
    setAllowShareData(checked);
  };

  const handleClickOk = async () => {
    if (allowShareData) {
      setIsLoading(true);
      await updateUser({ allowShareData });
      setIsLoading(false);
    }
    handleCloseDialog();
  };

  return (
    <Dialog open={isOpenDialog}>
      <DialogContent>
        <Styles.Text variant="body2">
          Deseja ativar o recurso abaixo? Você pode ativá-lo ou desativá-lo no
          seu perfil a qualquer momento.
        </Styles.Text>
        <AllowShareCheckbox
          checked={allowShareData}
          onChange={handleChangeCheckbox}
        />
      </DialogContent>
      <DialogActions>
        <LoadingButton
          variant="outlined"
          onClick={handleClickOk}
          loading={isLoading}
        >
          Ok
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
