import { act, renderHook, waitFor } from "@testing-library/react";
import type { Mock } from "vitest";
import { beforeEach, expect, test, vi } from "vitest";
import { usePlayerLoading } from ".";
import { usePlayerState } from "../player";

vi.mock("@/hooks/player", () => ({
  usePlayerState: vi.fn(),
}));

const playerState = usePlayerState as Mock;

beforeEach(() => {
  playerState.mockReset();
});

test("state when player.id is ''", () => {
  playerState.mockReturnValue({ id: "" });

  const { result } = renderHook(usePlayerLoading);
  expect(result.current.state).toBe(false);
});

test("state when player.id is 'foo'", async () => {
  playerState.mockReturnValue({ id: "foo" });

  const { result } = renderHook(usePlayerLoading);
  await waitFor(() => expect(result.current.state).toBe(true));
});

test("stopLoading", async () => {
  playerState.mockReturnValue({ id: "foo" });

  const { result } = renderHook(usePlayerLoading);
  await waitFor(() => expect(result.current.state).toBe(true));

  act(result.current.stop);
  expect(result.current.state).toBe(false);
});
