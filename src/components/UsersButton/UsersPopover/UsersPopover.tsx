import { gptResponseDatabase, usersDatabase } from "@database";
import type { IGptResponse, IUser } from "@interfaces";
import { CircularProgress, Modal, Popover, Typography } from "@mui/material";
import { getUserAcronym } from "@utils";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Styles from "./UsersPopover.styles";
import { useAuth } from "@contexts";
import { AcademicHistory } from "components/AcademicHistory/AcademicHistory";

interface UsersPopoverProps {
  anchorEl: null | Element;
  onClose?: () => void;
  open?: boolean;
}

export const UsersPopover = ({
  anchorEl,
  onClose,
  open,
  ...other
}: UsersPopoverProps) => {
  const { user: authUser } = useAuth();
  const [users, setUsers] = useState<IUser[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [gptResponse, setGptResponse] = useState<IGptResponse | null>();

  useEffect(() => {
    const loadUsers = async () => {
      const users = await usersDatabase.getUsers();
      setUsers(users);
    };

    loadUsers();
  }, [open]);

  const handleClickUser = async (user: IUser) => {
    if (!authUser?.allowShareData || !user.allowShareData) return;
    setIsOpen(true);
    const gptResponse = await gptResponseDatabase.getGptResponse(user.id);
    setGptResponse(gptResponse);
  };

  const handleClose = () => {
    setIsOpen(false);
    setGptResponse(null);
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={!!open}
      transitionDuration={0}
      slotProps={{
        paper: {
          sx: {
            p: 2,
          },
        },
      }}
      {...other}
    >
      <Typography variant="h6">Usuários</Typography>
      <Styles.List disablePadding>
        {users.map((user) => {
          const allowShareData =
            authUser?.allowShareData && user.allowShareData;

          return (
            <Styles.ListItem disableGutters key={user.id}>
              <Styles.UserButton
                LinkComponent={Link}
                startIcon={
                  <Styles.Avatar src={user.avatar}>
                    {getUserAcronym(user?.name, user?.email)}
                  </Styles.Avatar>
                }
                onClick={() => handleClickUser(user)}
              >
                <Styles.UserInfo>
                  {user?.name}
                  {allowShareData && (
                    <Typography variant="caption" color="gray">
                      {`Média Global: ${user.coefficient}`}
                    </Typography>
                  )}
                </Styles.UserInfo>
              </Styles.UserButton>
            </Styles.ListItem>
          );
        })}
      </Styles.List>
      <Modal open={isOpen} onClose={handleClose}>
        <Styles.ModalCard>
          {gptResponse ? (
            <AcademicHistory gptResponse={gptResponse} />
          ) : (
            <Styles.Loading>
              <CircularProgress size={24} />
            </Styles.Loading>
          )}
        </Styles.ModalCard>
      </Modal>
    </Popover>
  );
};
