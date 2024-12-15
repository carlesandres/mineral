import { useEffect } from "react";
import { useList } from "hooks/useList";
import { useRouter } from "next/navigation";

export const useLanding = () => {
  const { list } = useList();
  const router = useRouter();

  useEffect(() => {
    if (!list.initialized) {
      return;
    }

    if (!list.notes.length) {
      router.replace("/intro");
      return;
    }
    router.replace("/notes");
  }, [list]);

  return null;
};
