import { act, render, screen, waitFor } from "@testing-library/react";
import CoctailRecipe from "../CoctailRecipe";

jest.mock("@mui/material", () => {
  const actual = jest.requireActual("@mui/material");
  const React = require("react");

  return {
    ...actual,
    Grow: ({ children, addEndListener, in: isOpen }: any) => {
      React.useEffect(() => {
        if (addEndListener) {
          addEndListener();
        }
      }, [addEndListener, isOpen]);

      return <div>{children}</div>;
    },
    Grid: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    Box: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    Typography: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    Skeleton: ({ ...props }: any) => <div {...props} />
  };
});

describe("CoctailRecipe", () => {
  const mockFetch = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    process.env.REACT_APP_COCTAIL_API = "https://example.com/";
    (global as any).fetch = mockFetch;
    jest.spyOn(window, "alert").mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("fetches and renders the recipe details for a drink", async () => {
    mockFetch.mockResolvedValue({
      json: async () => ({
        drinks: [{
          strDrink: "Margarita",
          strDrinkThumb: "https://example.com/margarita.jpg",
          strGlass: "Coupe glass",
          strInstructions: "Shake all ingredients with ice and strain into a chilled glass.",
          strIngredient1: "Tequila",
          strIngredient2: "Triple sec",
          strIngredient3: "Lime juice",
          strMeasure1: "1 oz",
          strMeasure2: "1/2 oz",
          strMeasure3: "1/2 oz"
        }]
      })
    });

    render(<CoctailRecipe id={123} onClose={null} />);

    await waitFor(() =>
      expect(screen.getByText("Margarita")).toBeInTheDocument()
    );

    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("lookup.php?i=123"));
    expect(screen.getByText("Coupe glass")).toBeInTheDocument();
    expect(screen.getByText("1 oz Tequila")).toBeInTheDocument();
    expect(screen.getByText("1/2 oz Triple sec")).toBeInTheDocument();
    expect(screen.getByText("1/2 oz Lime juice")).toBeInTheDocument();
    expect(document.body.textContent).toContain("Shake all ingredients with ice and strain into a chilled glass.");
  });

  it("alerts when the drink payload is missing and does not throw", async () => {
    mockFetch.mockResolvedValue({
      json: async () => ({})
    });

    render(<CoctailRecipe id={456} onClose={null} />);

    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith("Error collecting information about this coctail.")
    );
  });

  it("calls onClose after the hidden recipe transition finishes", async () => {
    const onClose = jest.fn();

    mockFetch.mockResolvedValue({
      json: async () => ({
        drinks: [{
          strDrink: "Old Fashioned",
          strDrinkThumb: null,
          strGlass: "Old fashioned glass",
          strInstructions: "Stir with ice and garnish.",
          strIngredient1: "Whiskey",
          strMeasure1: "2 oz"
        }]
      })
    });

    render(<CoctailRecipe id={789} onClose={onClose} />);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(onClose).toHaveBeenCalled();
  });
});
