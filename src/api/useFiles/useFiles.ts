import { openai } from "@services";
import type { FileObject } from "openai/resources/files.mjs";
import type { Uploadable } from "openai/uploads.mjs";

export const useFiles = () => {
  const ementas = {
    id: import.meta.env.VITE_OPENAI_EMENTAS_FILE_ID,
  } as FileObject;

  const create = async (file: Uploadable) => {
    const history = await openai.files.create({
      file,
      purpose: "assistants",
    });

    return [ementas, history];
  };

  return { create };
};
