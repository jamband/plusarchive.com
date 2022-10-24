import { useRouter } from "next/router";

export const router = useRouter as jest.Mock;

beforeEach(() => {
  router.mockReset();
});
