import { useQuery } from "@tanstack/react-query";
import { AllSlices, useStore } from "~/state.client";

export default function useBalances() {
  const { viewClient, connected } = useStore((state: AllSlices) => state.prax);

  return useQuery({
    queryKey: ["balances"],
    queryFn: async () => {
      console.log("queryFn");
      const response = (await viewClient())?.balances({});

      if (response) {
        return Array.fromAsync(response);
      } else return [];
    },
    enabled: connected,
  });
}
