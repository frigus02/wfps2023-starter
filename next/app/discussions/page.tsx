import React from 'react'
import {getDiscussionsList} from '../server-utils/get-discussions-list';
import {DiscussionList} from './list';


const Page: React.FC = async () => {
  // Server side data
  const res = await getDiscussionsList();

  return (    
    <DiscussionList discussions = {res.discussions}></DiscussionList>
  )
};

export default Page;