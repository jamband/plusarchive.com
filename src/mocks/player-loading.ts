import { usePlayerLoading } from "~/hooks/player-loading";

export const loading = usePlayerLoading as jest.Mock;

beforeEach(() => {
  loading.mockReset();
});
