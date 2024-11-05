import { GithubEventType } from "../types/github.types";

export const processGithubEventsData = (events: GithubEventType[]): string => {
  return events
    .map((ghEvent) => {
      const user = ghEvent.actor?.login || "N/A";
      const action = ghEvent.type || "N/A";
      const repo = ghEvent.repo?.name || "N/A";
      const time = ghEvent.created_at || "N/A";
      return `User ${user} performed action ${action} on ${repo} at ${time}`;
    })
    .join("\n");
};
