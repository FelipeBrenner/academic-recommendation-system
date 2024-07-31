import { usersDatabase } from "@database";
import type { IUser } from "@interfaces";
import { Box, Popover, Typography } from "@mui/material";
import { getUserAcronym } from "@utils";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Styles from "./UsersPopover.styles";

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
	const [users, setUsers] = useState<IUser[]>([]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const loadUsers = async () => {
			const users = await usersDatabase.getUsers();
			setUsers(users);
		};

		loadUsers();
	}, [open]);

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
				{users.map((user) => (
					<Styles.ListItem disableGutters key={user.id}>
						<Styles.UserButton
							LinkComponent={Link}
							startIcon={
								<Styles.Avatar src={user.avatar}>
									{getUserAcronym(user?.name, user?.email)}
								</Styles.Avatar>
							}
						>
							<Box>{user?.name}</Box>
						</Styles.UserButton>
					</Styles.ListItem>
				))}
			</Styles.List>
		</Popover>
	);
};
