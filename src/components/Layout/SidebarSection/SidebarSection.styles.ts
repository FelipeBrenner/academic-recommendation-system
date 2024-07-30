import {
	List as MuiList,
	ListSubheader as MuiListSubheader,
	styled,
} from "@mui/material";

export const ListSubheader = styled(MuiListSubheader)(({ theme }) => ({
	...theme.typography.overline,
	color: theme.palette.neutral?.[500],
	marginLeft: theme.spacing(4),
}));

export const List = styled(MuiList)(({ theme }) => ({
	marginTop: theme.spacing(2),
	"& + &": {
		marginTop: 0,
	},
}));
