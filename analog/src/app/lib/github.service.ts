import {Injectable} from '@angular/core';
import {App} from 'octokit';

import GITHUB_KEY from '../../../.env.private-key-pkcs8.key?raw';

import type {Discussion, DiscussionComment, DiscussionDetails} from './github-interfaces';

interface QueryVariables {
  [name: string]: unknown;
}

@Injectable({providedIn: 'root'})
export class GithubService {
  private async queryGraphQl(query: string, variables?: QueryVariables):
      Promise<unknown> {
    const app = new App({
      appId: import.meta.env['VITE_GITHUB_APP_ID'],
      privateKey: GITHUB_KEY,
      oauth: {
        clientId: import.meta.env['VITE_GITHUB_CLIENT_ID'],
        clientSecret: import.meta.env['VITE_GITHUB_CLIENT_SECRET']
      }
    });
    const octokit = await app.getInstallationOctokit(
        import.meta.env['VITE_GITHUB_INSTALLATION_ID']);

    return await octokit.graphql(
        query,
        Object.assign(
            {
              repoOwner: import.meta.env['VITE_GITHUB_REPO_OWNER'],
              repoName: import.meta.env['VITE_GITHUB_REPO_NAME']
            },
            variables));
  }


  async getDiscussionList(): Promise<Discussion[]> {
    const body = await this.queryGraphQl(`
      query discussionList($repoOwner: String!, $repoName: String!) {
        repository(owner: $repoOwner, name: $repoName) {
          discussions(last: 10) {
            edges {
              node {
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
      }
    `);
    const discussions = (body as any).repository.discussions.edges;
    return discussions.map((discussion: any) => ({
                             number: discussion.node.number,
                             title: discussion.node.title,
                             author: discussion.node.author.login,
                             createdAt: discussion.node.createdAt
                           }));
  }

  async getDiscussionDetails(number: number): Promise<DiscussionDetails> {
    const body = await this.queryGraphQl(
        `
      query discussionDetails($repoOwner: String!, $repoName: String!,
      $number: Int!) {
        repository(owner: $repoOwner, name: $repoName) {
          discussion(number: $number) {
            number
            title
            author {
              login
            }
            createdAt
            reactionGroups {
              content
              reactors {
                totalCount
              }
            }
            bodyHTML
          }
        }
      }
    `,
        {number});
    const discussion = (body as any).repository.discussion;
    return {
      number: discussion.number,
      title: discussion.title,
      author: discussion.author.login,
      createdAt: discussion.createdAt,
      reactionGroups: discussion.reactionGroups.map(
          (group: any) => (
              {content: group.content, totalCount: group.reactors.totalCount})),
      bodyHTML: discussion.bodyHTML
    };
  }

  async getDiscussionComments(number: number): Promise<DiscussionComment[]> {
    const body = await this.queryGraphQl(
        `
      query discussionComments($repoOwner: String!, $repoName: String!,
      $number: Int!) {
        repository(owner: $repoOwner, name: $repoName) {
          discussion(number: $number) {
            comments(last: 10) {
              edges {
                node {
                  author {
                    login
                  }
                  createdAt
                  bodyHTML
                }
              }
            }
          }
        }
      }
    `,
        {number});
    const comments = (body as any).repository.discussion.comments.edges;
    return comments.map((comment: any) => ({
                          author: comment.node.author.login,
                          createdAt: comment.node.createdAt,
                          bodyHTML: comment.node.bodyHTML
                        }));
  }
}
