import {queryGraphql} from "./query-graphql";

export interface Discussion {
  id: string;
  number: number;
  title: string;
  author: string;
  createdAt: string;
}

export interface DiscussionListResponse {
  discussions: Discussion[];
}

export async function getDiscussionsList(): Promise<DiscussionListResponse> {
  const data: any = await queryGraphql(`
  query discussionList($repoOwner: String!, $repoName: String!) {
    repository(owner: $repoOwner, name: $repoName) {
      discussions(last: 10) {
        edges {
          node {
            id,
            number
            title
            author {
              login
            }
            createdAt
          }
        }
      }
    }
  }`);

  return {
    discussions: data.repository.discussions.edges.map(
      ({ node: { id, number, title, author, createdAt } }: any) => ({
        id,
        number,
        title,
        author: author.login,
        createdAt,
      }),
    ),
  };
}
