import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import PokemonDetailsCard from "../ItemDetailsCard";
import * as ReactRouterDom from "react-router-dom";
import * as PokemonApi from "../../api/pokemon-api-slice";

// ------------------------- START MOCKING ------------
//  get params from url
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

// mocking hook of getting api details
vi.mock("../../api/pokemon-api-slice", () => ({
  useGetPokemonDetailsQuery: vi.fn(),
}));

// mocking Loading Spinner and add a loding text
vi.mock("../../../../shared/components/LoadingSpinnet", () => ({
  __esModule: true,
  default: () => <p data-testid="loading-spinner">Loading...</p>,
}));

// ------------------------- END MOCKING ------------

// ------------------------- START TESTING ------------
// test get params from router & call the hook of getting data & show the loading whlie fetching is true
describe("PokemonDetailsCard", () => {
  const mockUseParams = vi.mocked(ReactRouterDom.useParams, { partial: true });
  const mockUseGetPokemonDetailsQuery = vi.mocked(
    PokemonApi.useGetPokemonDetailsQuery,
    { partial: true }
  );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading spinner when fetching", () => {
    mockUseParams.mockReturnValue({ item: "mohamed" });
    mockUseGetPokemonDetailsQuery.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: false,
      isFetching: true,
    });

    render(<PokemonDetailsCard />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  // render data

  it("render details data whne we retireive the data success", () => {
    mockUseParams.mockReturnValue({ item: "mohamed" });
    mockUseGetPokemonDetailsQuery.mockReturnValue({
      data: {
        name: "mohamed",
        height: 7,
        weight: 69,
        sprites: { front_default: "http://example.com/mohamed.png" },
      },
      error: undefined,
      isLoading: false,
      isFetching: false,
    });

    render(<PokemonDetailsCard />);
    expect(screen.getAllByText("mohamed")).toHaveLength(2);

    expect(screen.getByAltText("mohamed")).toHaveAttribute(
      "src",
      "http://example.com/mohamed.png"
    );
    expect(screen.getByText("Height")).toBeInTheDocument();
    expect(screen.getByText("Weight")).toBeInTheDocument();
  });
});
