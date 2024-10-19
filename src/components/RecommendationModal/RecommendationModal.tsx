import { type Dispatch, useState } from "react";
import { Modal, Typography } from "@mui/material";
import * as Styles from "./RecommendationModal.styles";
import { Dropzone } from "@components";
import { useFiles, useGetRecommendations } from "@api";
import { type Id, toast } from "react-toastify";
import { getFormattedCurrentDate } from "@utils";
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
      "Olá, espero que você seja um aluno de Ciência da Computação da Unisinos, pois só com você irá funcionar essa plataforma, por enquanto 😄!\nGere seu histórico escolar a partir do Minha Unisinos, e o utilize aqui para gerar recomendações de estudos personalizadas.",
    success: "Recomendações geradas com sucesso!",
  },
  true: {
    button: "Gerar as recomendações novamente",
    description:
      "Entendemos que pode ter ocorrido erro de análise dos dados por parte da inteligência artificial, é comum. Portanto, pode gerar as recomendações novamente a partir do mesmo histórico escolar, até estar satisfeito com seus resultados.",
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
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<FileWithPath | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toastLoadingId, setToastLoadingId] = useState<Id>();
  const { user } = useAuth();
  const { create } = useFiles();
  const { mutate } = useGetRecommendations();

  const texts =
    recommendationsTexts[hasRecommendations as unknown as "true" | "false"];

  const handleFinish = () => {
    setFile(null);
    setIsLoading(false);
    toast.dismiss(toastLoadingId);
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    setToastLoadingId(
      toast.loading("Boa, estamos gerando suas recomendações, aguarde!")
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
            const gptResponse = {
              ...data,
              lastUpdated: `Dados coletados e analisados em: ${getFormattedCurrentDate()}`,
            };
            setGptResponse(gptResponse);
            gptResponseDatabase.updateGptResponse({
              userId: user!.id,
              gptResponse,
            });

            handleFinish();
            toast.success(texts.success);
            handleClose();
          } else {
            throw new Error();
          }
        },
        onError: () => {
          handleFinish();
        },
      });
    } catch {
      handleFinish();
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Styles.ModalButton variant="outlined" onClick={handleOpen}>
        {texts.button}
      </Styles.ModalButton>
      <Modal open={isOpen} onClose={handleClose} disableEscapeKeyDown>
        <Styles.ModalCard>
          <Typography>{texts.description}</Typography>

          {file ? (
            <Typography>{`Boa, você selecionou o arquivo: ${file.name}`}</Typography>
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
    </>
  );
};
