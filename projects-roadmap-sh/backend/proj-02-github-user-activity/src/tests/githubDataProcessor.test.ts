import { processGithubEventsData } from "../services/githubDataProcessor";
import { GithubEventType } from "../types/github.types";

describe("processGithubEventsData", () => {
  it("should format events data correctly", () => {
    const mockEvents: GithubEventType[] = [
      {
        actor: { login: "user1" },
        type: "PushEvent",
        repo: { name: "repo1" },
        created_at: "2024-11-05T12:00:00Z",
      },
      {
        actor: { login: "user2" },
        type: "IssueCommentEvent",
        repo: { name: "repo2" },
        created_at: "2024-11-05T13:00:00Z",
      },
    ];

    const expectedOutput =
      `User user1 performed action PushEvent on repo1 at 2024-11-05T12:00:00Z\n` +
      `User user2 performed action IssueCommentEvent on repo2 at 2024-11-05T13:00:00Z`;

    expect(processGithubEventsData(mockEvents)).toBe(expectedOutput);
  });

  it("should handle empty events array", () => {
    const mockEvents: GithubEventType[] = [];
    expect(processGithubEventsData(mockEvents)).toBe("");
  });

  it("should handle missing properties gracefully", () => {
    const mockEvents: GithubEventType[] = [
      {
        actor: undefined,
        type: "CreateEvent",
        repo: undefined,
        created_at: "2024-11-05T14:00:00Z",
      },
    ];

    const expectedOutput = `User N/A performed action CreateEvent on N/A at 2024-11-05T14:00:00Z`;

    expect(processGithubEventsData(mockEvents)).toBe(expectedOutput);
  });
});
