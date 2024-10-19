import { localStorageKeys } from "@constants";
import { useAuth } from "@contexts";
import { gptResponseDatabase } from "@database";
import type { IGptResponse } from "@interfaces";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

export const useGptResponse = () => {
  const { user } = useAuth();
  const [gptResponse, setGptResponse] = useLocalStorage<IGptResponse | null>(
    localStorageKeys.gptResponse,
    null
  );

  useEffect(() => {
    const load = async () => {
      const gptResponse = await gptResponseDatabase.getGptResponse(user!.id);
      setGptResponse(gptResponse);
    };

    load();
  }, [user]);

  return {
    gptResponse,
    setGptResponse,
  };
};
