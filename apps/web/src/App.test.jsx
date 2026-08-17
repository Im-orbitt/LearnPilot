import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "./App";

describe("App", () => {
  test("renders the application", () => {
    render(<App />);

    expect(document.body).toBeTruthy();
  });
});
