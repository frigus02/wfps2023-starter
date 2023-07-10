import React from 'react';

import {DiscussionHeader} from './discussion-header';

const Layout: React.FC<React.PropsWithChildren> = props => {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <DiscussionHeader></DiscussionHeader>
      {props.children}
    </main>
  )
};

export default Layout;