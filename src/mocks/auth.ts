import { useAuth } from "@/hooks/auth";

export const auth = useAuth as jest.Mock;

beforeEach(() => {
  auth.mockReset();
});
