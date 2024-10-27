import { type Dispatch, useEffect, useState } from "react";
import { Modal, Typography } from "@mui/material";
import * as Styles from "./RecommendationModal.styles";
import { AllowShareDialog, Dropzone } from "@components";
import { useFiles, useGetRecommendations } from "@api";
import { type Id, toast } from "react-toastify";
import { getCoefficient, getFormattedCurrentDate } from "@utils";
import type { IGptResponse } from "@interfaces";
import { gptResponseDatabase } from "@database";
import { useAuth } from "@contexts";
import type { FileWithPath } from "react-dropzone";
import { getDownloadURL, ref, uploadBytes, getBlob } from "firebase/storage";
import { storage } from "@services";

const recommendationsTexts = {
  false: {
    button: "Gerar recomendações",
    description:
      "Olá! Espero que você seja aluno de Ciência da Computação da Unisinos, pois, por enquanto, a plataforma só funciona para você 😄.\nGere seu histórico acadêmico no Minha Unisinos e utilize-o aqui para obter recomendações personalizadas de estudo.\nOnde gerar: https://www.unisinos.br/minha-unisinos/aluno/ -> Autoatendimento -> Emissão de documentos -> Secretaria -> Histórico Escolar por Curso - doc. para simples conferência.",
    success: "Recomendações geradas com sucesso!",
  },
  true: {
    button: "Gerar as recomendações novamente",
    description:
      "É possível que tenha ocorrido um erro na análise de dados ou na leitura do documento pela inteligência artificial durante sua geração em específico, o que pode ter afetado o reconhecimento e a associação de notas e disciplinas. Sinta-se à vontade para gerar novamente com o mesmo histórico escolar, pois, embora o modelo tenha sido treinado para responder corretamente, em alguns casos isolados ele ainda pode apresentar inconsistências.",
    success: "Recomendações geradas novamente com sucesso!",
  },
};

interface IRecommendationModal {
  hasRecommendations: boolean;
  setGptResponse: Dispatch<React.SetStateAction<IGptResponse | null>>;
}

export const RecommendationModal = ({
  hasRecommendations,
  setGptResponse,
}: IRecommendationModal) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [file, setFile] = useState<FileWithPath | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toastLoadingId, setToastLoadingId] = useState<Id>();
  const { user, updateUser } = useAuth();
  const { create } = useFiles();
  const { mutate } = useGetRecommendations();

  useEffect(() => {
    return () => toast.dismiss();
  }, []);

  const texts =
    recommendationsTexts[hasRecommendations as unknown as "true" | "false"];

  const handleFinish = () => {
    setFile(null);
    setIsLoading(false);
    toast.dismiss(toastLoadingId);
    setToastLoadingId(undefined);
  };

  const toastError = () => {
    toast.error(
      "Houve um erro ao gerar as recomendações. Tente gerar novamente e, se o erro persistir, contate o desenvolvedor!"
    );
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    setToastLoadingId(
      toast.loading(
        "Boa! Estamos analisando seu arquivo e gerando suas recomendações. Geralmente, isso leva um pouco mais de 1 minuto. Por favor, aguarde!"
      )
    );
    try {
      const fileRef = ref(storage, `history-${file!.name}`);
      await uploadBytes(fileRef, file!);
      const url = await getDownloadURL(fileRef);
      const blob = async () => await getBlob(fileRef);
      const files = await create({
        url,
        blob,
      });
      mutate(files, {
        onSuccess: (data) => {
          if (data?.recommendations) {
            const coefficient = getCoefficient(data.academic_history);
            const gptResponse: IGptResponse = {
              ...data,
              lastUpdated: `Dados gerados em: ${getFormattedCurrentDate()}`,
              academic_info: [
                ...data.academic_info,
                {
                  title: "Média Global:",
                  info: coefficient,
                },
              ],
            };
            setGptResponse(gptResponse);
            gptResponseDatabase.updateGptResponse({
              userId: user!.id,
              gptResponse,
            });
            if (user?.generations === 0) {
              setTimeout(handleOpenDialog, 2000);
            }
            updateUser({ generations: user!.generations + 1, coefficient });
            handleFinish();
            toast.success(texts.success);
            handleCloseModal();
          } else {
            throw new Error();
          }
        },
        onError: () => {
          handleFinish();
          toastError();
        },
      });
    } catch {
      handleFinish();
      toastError();
    }
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    if (!isLoading) {
      setFile(null);
    }
    setIsOpenModal(false);
  };

  const handleOpenDialog = () => {
    setIsOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };

  return (
    <>
      <Styles.ModalButton variant="outlined" onClick={handleOpenModal}>
        {texts.button}
      </Styles.ModalButton>
      <Modal open={isOpenModal} onClose={handleCloseModal}>
        <Styles.ModalCard>
          <Typography variant="body2">{texts.description}</Typography>

          {file ? (
            <Typography variant="body2">{`Boa! Você selecionou o arquivo: ${file.name}.`}</Typography>
          ) : (
            <Dropzone setFile={setFile} />
          )}
          <Styles.ConfirmButton
            variant="outlined"
            onClick={handleConfirm}
            loading={isLoading}
            disabled={!file}
          >
            Gerar
          </Styles.ConfirmButton>
        </Styles.ModalCard>
      </Modal>
      <AllowShareDialog
        isOpenDialog={isOpenDialog}
        handleCloseDialog={handleCloseDialog}
      />
    </>
  );
};
