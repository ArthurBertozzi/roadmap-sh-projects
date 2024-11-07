import { GithubClient } from "./client/github";
import { processGithubEventsData } from "./services/githubDataProcessor";
import { askQuestion, closeInterface } from "./services/terminal";

const main = async () => {
  const username = await askQuestion("Enter github username: \n");
  const githubClient = new GithubClient();
  const events = await githubClient.getUserActivity(username);
  console.log(`\n${processGithubEventsData(events)}\n`);
  closeInterface();
};

main();
