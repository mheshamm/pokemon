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
    mockUseParams.mockReturnValue({ item: "bulbasaur" });
    mockUseGetPokemonDetailsQuery.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: false,
      isFetching: true,
    });

    render(<PokemonDetailsCard />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  
});
