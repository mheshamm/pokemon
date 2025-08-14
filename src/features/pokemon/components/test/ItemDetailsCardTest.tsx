import { vi } from "vitest";


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
vi.mock("../api/pokemon-api-slice", () => ({
  useGetPokemonDetailsQuery: vi.fn(),
}));

// mocking Loading Spinner and add a loding text
vi.mock("../../../shared/components/LoadingSpinnet", () => ({
  __esModule: true,
  default: () => <p data-testid="loading-spinner">Loading...</p>,
}));

// ------------------------- END MOCKING ------------

