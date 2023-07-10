import React from 'react';
import {Discussion} from './get-discussions-list';

const DiscussionItem: React.FC<{discussion: Discussion}> = ({discussion}) => {
  return (
    <article>
      <h2>{discussion.title}</h2>
      <p>By: {discussion.author}</p>
      <p>Created at: {discussion.createdAt}</p>
      <hr></hr>
    </article>
  )
};

export const DiscussionList: React.FC<{discussions: Discussion[]}> = ({discussions}) => {
  return discussions.map(discussion => (
    <DiscussionItem discussion={discussion} key={discussion.id}/>
  ));
};