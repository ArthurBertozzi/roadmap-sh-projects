// GithubClient.test.ts
import { GithubClient } from "../client/github";
import { Axios } from "axios";

jest.mock("axios");

describe("GithubClient", () => {
  let githubClient: GithubClient;
  let axiosMockInstance: jest.Mocked<Axios>;

  beforeEach(() => {
    const AxiosMockedClass = Axios as jest.MockedClass<typeof Axios>;

    AxiosMockedClass.mockClear();

    githubClient = new GithubClient();

    axiosMockInstance = AxiosMockedClass.mock
      .instances[0] as jest.Mocked<Axios>;
  });

  it("deve buscar a atividade do usuário", async () => {
    const mockData = [{ id: 1, type: "PushEvent" }];

    axiosMockInstance.get.mockResolvedValue({
      data: JSON.stringify(mockData),
    });

    const username = "testuser";

    const result = await githubClient.getUserActivity(username);

    expect(axiosMockInstance.get).toHaveBeenCalledWith(
      `/users/${username}/events`
    );
    expect(result).toEqual(mockData);
  });
});
