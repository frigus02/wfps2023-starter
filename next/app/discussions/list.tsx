'use client'

/**
 * This are client side components, which fetches data in browser.
 */

import React, {useState} from 'react'
import {Discussion} from '../server-utils/get-discussions-list'
import useSWR from 'swr'
import type {DiscussionDetail} from '@/app/server-utils/get-discussion-detail';

const fetcher = (url:string) => fetch(url).then(r => r.json());

const DiscussionItem: React.FC<{discussion: Discussion}> = ({discussion}) => {
  const [showDetails, setShowDetails] = useState(false);

  const {data} = useSWR(() => (showDetails ? `/api/discussions/${discussion.number}` : null), fetcher);
 
  const showDetailsClicked = ()=> {
    setShowDetails(true);
  }
  
  return (
    <article className="mb-4">
      <h2>Title: {discussion.title}</h2>
      <p>By: {discussion.author}</p>
      <p>Created at: {discussion.createdAt}</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={showDetailsClicked}>Fetch and show body text below!</button>
      <section>
        {data?.discussion && (<InlineDiscussionDetail discussion={data.discussion}></InlineDiscussionDetail>)}
      </section>
      <hr></hr>
    </article>
  )
};

export const DiscussionList: React.FC<{discussions: Discussion[]}> = ({discussions}) => {
  return discussions.map(discussion => (
    <DiscussionItem discussion={discussion} key={discussion.id}/>
  ));
};

export const InlineDiscussionDetail: React.FC<{discussion: DiscussionDetail}> = ({discussion}) => {
  return <div className="border-blue-500 border-opacity-100 p-3" dangerouslySetInnerHTML={{__html: discussion.bodyHTML}} />
};