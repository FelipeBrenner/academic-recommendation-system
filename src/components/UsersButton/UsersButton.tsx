import PeopleIcon from "@mui/icons-material/People";
import { Tooltip } from "@mui/material";
import { useRef, useState } from "react";
import * as Styles from "./UsersButton.styles";
import { UsersPopover } from "./UsersPopover/UsersPopover";

export const UsersButton = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [openPopover, setOpenPopover] = useState(false);

  const handleOpenPopover = () => {
    setOpenPopover(true);
  };

  const handleClosePopover = () => {
    setOpenPopover(false);
  };

  return (
    <>
      <Tooltip title={<Styles.Card>Usuários</Styles.Card>}>
        <Styles.IconButton onClick={handleOpenPopover} ref={anchorRef}>
          <PeopleIcon fontSize="small" />
        </Styles.IconButton>
      </Tooltip>
      <UsersPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      />
    </>
  );
};
