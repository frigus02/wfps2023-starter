import React from 'react';

export const DiscussionHeader: React.FC = () => {
  return (
    <header className="mb-4">
      <h1 className={`mb-1 text-2xl font-semibold`}>Discussions</h1>
      <p className={`mb-1 max-w-[30ch] text-sm opacity-50`}>From Github</p>
      <hr></hr>
    </header>
  )
}