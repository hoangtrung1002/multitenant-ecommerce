import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const useTRPCSession = () => {
  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());
  return { trpc, session };
};

export default useTRPCSession;
