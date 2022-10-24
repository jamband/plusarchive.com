import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../auth";

export const useRequireGuest = () => {
  const { data } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    if (data?.role === "admin") {
      push("/admin");
      return;
    }
  }, [data, push]);
};

export const useRequireAdmin = () => {
  const { data, isLoading } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (data?.role !== "admin") {
      push("/");
      return;
    }
  }, [isLoading, data, push]);
};
