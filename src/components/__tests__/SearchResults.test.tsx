import { fireEvent, render, screen } from "@testing-library/react";
import SearchResults from "../SearchResults";
import { SearchResult } from "../../types";

jest.mock("../CoctailRecipe", () => {
  const React = jest.requireActual("react");

  return {
    __esModule: true,
    default: ({ id }: { id: number }) =>
      React.createElement("div", null, `Recipe ${id}`)
  };
});

const drinks: SearchResult[] = [
  { idDrink: 1, strDrink: "Margarita", strDrinkThumb: "margarita.jpg" },
  { idDrink: 2, strDrink: "Martini", strDrinkThumb: "martini.jpg" }
];

describe("SearchResults", () => {
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: jest.fn()
    });
  });

  it("closes the currently open recipe when another recipe is selected", () => {
    render(<SearchResults coctails={drinks} />);

    fireEvent.click(screen.getByText("Margarita"));
    expect(screen.getByText("Recipe 1")).toBeInTheDocument();
    expect(screen.getByText("Martini")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Martini"));

    expect(screen.queryByText("Recipe 1")).not.toBeInTheDocument();
    expect(screen.getByText("Margarita")).toBeInTheDocument();
    expect(screen.getByText("Recipe 2")).toBeInTheDocument();
  });
});
