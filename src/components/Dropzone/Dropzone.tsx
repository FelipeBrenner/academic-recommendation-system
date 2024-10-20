import { type FileWithPath, useDropzone } from "react-dropzone";
import * as Styles from "./Dropzone.styles";
import { Typography } from "@mui/material";

const getOpacity = (isDragActive: boolean) => {
  if (isDragActive) {
    return { opacity: 1 };
  }
  return {};
};

interface IDropzone {
  setFile: (file: FileWithPath) => void;
}

export const Dropzone = ({ setFile }: IDropzone) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (files) => {
      setFile(files[0]);
    },
  });

  return (
    <Styles.Dropzone {...getRootProps()} style={getOpacity(isDragActive)}>
      <input {...getInputProps()} />
      <Typography variant="body2">
        Arraste aqui seu histórico acadêmico ou clique para selecionar
      </Typography>
    </Styles.Dropzone>
  );
};
