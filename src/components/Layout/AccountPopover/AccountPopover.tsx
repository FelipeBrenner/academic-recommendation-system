import { pathRoutes } from "@constants";
import { useAuth } from "@contexts";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import { getUserAcronym } from "@utils";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Styles from "./AccountPopover.styles";

interface AccountPopoverProps {
  anchorEl: null | Element;
  onClose: () => void;
  open: boolean;
}

export const AccountPopover = ({
  anchorEl,
  onClose,
  open,
  ...other
}: AccountPopoverProps) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = async (): Promise<void> => {
    try {
      onClose?.();
      await logout();
      navigate(pathRoutes.login);
    } catch (err) {
      console.error(err);
      toast.error("Não foi possível sair.");
    }
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom",
      }}
      keepMounted
      onClose={onClose}
      open={!!open}
      transitionDuration={0}
      {...other}
    >
      <Styles.AccountBox>
        <Styles.Avatar src={user?.avatar}>
          {getUserAcronym(user?.name, user?.email)}
        </Styles.Avatar>
        <Styles.DetailsBox>
          <Typography>{user?.name}</Typography>
          <Typography color="textSecondary" variant="body2">
            {user?.email}
          </Typography>
        </Styles.DetailsBox>
      </Styles.AccountBox>
      <Divider />
      <Styles.MenuBox>
        <MenuItem component={Link} to={pathRoutes.perfil}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={<Typography>Perfil</Typography>} />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={<Typography>Sair</Typography>} />
        </MenuItem>
      </Styles.MenuBox>
    </Popover>
  );
};
