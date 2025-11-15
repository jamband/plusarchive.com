import { playerState } from "@/mocks/player-state";
import { act, renderHook } from "@testing-library/react";
import { usePlayerLoading } from ".";

jest.mock("@/hooks/player", () => ({
  usePlayerState: jest.fn(),
}));

test("state when player.id is ''", () => {
  playerState.mockReturnValue({ id: "" });

  const { result } = renderHook(usePlayerLoading);
  expect(result.current.state).toBe(false);
});

test("state when player.id is 'foo'", () => {
  playerState.mockReturnValue({ id: "foo" });

  const { result } = renderHook(usePlayerLoading);
  setTimeout(() => {
    expect(result.current.state).toBe(true);
  });
});

test("stopLoading", () => {
  playerState.mockReturnValue({ id: "foo" });

  const { result } = renderHook(usePlayerLoading);
  setTimeout(() => {
    expect(result.current.state).toBe(true);
  });

  act(result.current.stop);
  expect(result.current.state).toBe(false);
});
