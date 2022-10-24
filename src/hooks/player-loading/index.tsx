import { useEffect, useState } from "react";
import { usePlayerState } from "../player";

export const usePlayerLoading = () => {
  const [loading, setLoading] = useState(false);
  const player = usePlayerState();
  const [key, setKey] = useState("");

  const stopLoading = () => {
    setLoading(false);
  };

  useEffect(() => {
    if (player.id !== "") {
      setKey(player.id);
    }

    if (player.id !== key) {
      setLoading(true);
    }
  }, [player.id, key]);

  return {
    state: loading,
    stop: stopLoading,
  } as const;
};
