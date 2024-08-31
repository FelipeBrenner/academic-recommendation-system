import { useAuth } from "@contexts";
import { LoadingButton } from "@mui/lab";
import {
	Button,
	CardContent,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import { storage } from "@services";
import { getUserAcronym } from "@utils";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRef, useState, type ChangeEvent } from "react";
import { toast } from "react-toastify";
import * as Styles from "./ProfileGeneral.styles";

export const ProfileGeneral = () => {
	const { user, updateUser } = useAuth();
	const [avatar, setAvatar] = useState(user?.avatar);
	const [name, setName] = useState(user?.name);
	const [isLoadingChangeAvatar, setIsLoadingChangeAvatar] = useState(false);
	const [isLoadingSave, setIsLoadingSave] = useState(false);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleChangeAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
		const [file] = event.target.files ?? [];

		if (file) {
			setIsLoadingChangeAvatar(true);
			try {
				const avatarsRef = ref(storage, `avatar-${file.name}`);
				await uploadBytes(avatarsRef, file);
				await getDownloadURL(avatarsRef).then((avatar) => {
					setAvatar(avatar);
					setIsLoadingChangeAvatar(false);
				});
			} catch (error) {
				toast.error("Erro ao alterar a imagem!");
				console.error(error);
				setIsLoadingChangeAvatar(false);
			}
		}
	};

	const handleCancel = async () => {
		if (user) {
			setAvatar(user.avatar);
			setName(user.name);
		}
	};

	const handleSave = async () => {
		try {
			setIsLoadingSave(true);
			updateUser({ avatar, name }).then(() => {
				toast.success("Usuário atualizado com sucesso!");
				setIsLoadingSave(false);
			});
		} catch (error) {
			toast.error("Erro ao atualizar o usuário!");
			console.error(error);
			setIsLoadingSave(false);
		}
	};

	const hasChanged = avatar !== user?.avatar || name !== user?.name;

	return (
		<>
			<Styles.Card>
				<CardContent>
					<Grid container spacing={3}>
						<Grid item md={4} xs={12}>
							<Typography variant="h6">Informações gerais</Typography>
						</Grid>
						<Grid item md={8} xs={12}>
							<Styles.AvatarContainer>
								<Styles.Avatar src={avatar}>
									{getUserAcronym(user?.name, user?.email)}
								</Styles.Avatar>
								<LoadingButton
									onClick={() => fileInputRef.current?.click()}
									loading={isLoadingChangeAvatar}
								>
									Alterar
									<input
										hidden
										ref={fileInputRef}
										type="file"
										onChange={handleChangeAvatar}
									/>
								</LoadingButton>
							</Styles.AvatarContainer>
							<Grid container spacing={3}>
								<Grid item md={12} xs={12}>
									<TextField
										value={name}
										label="Nome"
										size="small"
										onChange={(event) => setName(event.target.value)}
										fullWidth
									/>
								</Grid>
								<Grid item md={12} xs={12}>
									<Styles.InputEmail
										defaultValue={user?.email}
										disabled
										label="Email"
										size="small"
									/>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</CardContent>
			</Styles.Card>
			<Styles.ButtonContainer>
				<Button onClick={handleCancel} disabled={!hasChanged}>
					Cancelar
				</Button>
				<LoadingButton
					variant="contained"
					loading={isLoadingSave}
					type="submit"
					disabled={!hasChanged}
					onClick={handleSave}
					sx={{ marginLeft: 2 }}
				>
					Salvar
				</LoadingButton>
			</Styles.ButtonContainer>
		</>
	);
};
