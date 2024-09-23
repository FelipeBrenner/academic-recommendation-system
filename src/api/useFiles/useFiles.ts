import { openai } from "@services";
import type { FileObject } from "openai/resources/files.mjs";
import { useState } from "react";

export const useFiles = () => {
	const [files, setFiles] = useState<Array<FileObject>>([]);

	const loadFiles = () => {
		list().then((response) => {
			setFiles(response.data);
		});
	};

	const create = async (path: string) => {
		await openai.files.create({
			file: new File([path], "file"),
			purpose: "assistants",
		});

		loadFiles();
	};

	const list = async () => {
		const list = await openai.files.list();

		return list;
	};

	const del = async (fileId: string) => {
		await openai.files.del(fileId);

		loadFiles();
	};

	return { files, create, del };
};
