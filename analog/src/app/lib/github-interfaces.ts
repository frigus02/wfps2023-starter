import type {REACTIONS} from './reactions';

export interface Discussion {
  number: number;
  title: string;
  author: string;
  createdAt: string;
}

export interface DiscussionComment {
  author: string;
  createdAt: string;
  bodyHTML: string;
}

export interface ReactionGroup {
  content: (typeof REACTIONS)[number];
  totalCount: number;
}

export interface DiscussionDetails extends Discussion {
  reactionGroups: ReactionGroup[];
  bodyHTML: string;
}
