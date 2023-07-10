import React from 'react'
import {getDiscussionsList} from './get-discussions-list';
import { DiscussionList } from './list';


export default async function Page() {
  const res = await getDiscussionsList();

  //console.log("list is", list);

  return (    
    <DiscussionList discussions = {res.discussions}></DiscussionList>
  )
};

//export default Page;