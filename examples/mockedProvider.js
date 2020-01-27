import { MockedProvider } from "@apollo/react-testing";
import { render, wait } from "@testing-library/react";
import { ARTWORKS_FILTER } from "../queries";
import ArtworksList from "./ArtworksList";

const mocks = [
  {
    request: {
      query: ARTWORKS_FILTER,
      variables: {
        pageSize: 20,
        page: 1,
        term: "david bowie",
      },
    },
    result: {
      data: {
        counts: {
          total: 10,
        },
        filtered_artworks: {
          pageCursors: {
            previous: {
              page: 0,
            },
          },
          edges: {
            node: [
              {
                id: "id1",
                href: "test-url",
                title: "test-title",
                image: {
                  url: "test-url",
                },
              },
              {
                id: "id2",
                href: "test-url2",
                title: "test-title2",
                image: {
                  url: "test-url2",
                },
              },
            ],
          },
        },
      },
    },
  },
];

it("renders queried artworks", async () => {
  const { queryByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ArtworksList />
    </MockedProvider>
  );

  await wait();

  expect(queryByText("test-title")).toBeInTheDocument();
});
