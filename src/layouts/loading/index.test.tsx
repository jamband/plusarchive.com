import { router } from "@/mocks/router";
import { render, screen } from "@testing-library/react";
import { Loading } from ".";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

test("", () => {
  router.mockReturnValue({
    events: {
      on: jest.fn((event, callback) => {
        if (event === "routeChangeStart") {
          callback("/");
        }
      }),
      off: jest.fn(),
    },
  });

  render(<Loading />);

  const status = screen.getByRole("status");
  expect(status).toHaveClass("fixed w-[99%]");
});
