import {Octokit} from "@octokit/core";

const MyOctokit = Octokit.defaults({
  baseUrl: "https://api.github.com",
  headers: {
    accept: 'application/vnd.github.v3+json',
  },
});

const octokit = new MyOctokit()

export const issuesApi = async (state: string, sort: string, page: number) =>
  await octokit.request(`GET /repos/{owner}/{repo}/issues?state=${state}&per_page=10&page=${page}&sort=${sort}`, {
    owner: 'yugabyte',
    repo: 'yugabyte-db',
  })

export const userApi = async (user: string) => await octokit.request(`GET /users/${user}`)