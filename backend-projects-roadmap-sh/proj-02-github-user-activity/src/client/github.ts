import { Axios } from "axios";
import { GithubEventType } from "../types/github.types";

export class GithubClient {
  private axios: Axios;

  constructor() {
    this.axios = new Axios({
      baseURL: "https://api.github.com",
    });
  }

  async getUserActivity(username: string): Promise<GithubEventType[]> {
    const result = await this.axios.get(`/users/${username}/events`);
    return JSON.parse(result.data);
  }
}
