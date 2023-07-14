import {RouteMeta} from '@analogjs/router';
import {NgFor} from '@angular/common';
import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';

import type {Discussion} from '../../lib/github-interfaces';
import {GithubService} from '../../lib/github.service';

export const routeMeta: RouteMeta = {
  title: 'Github Discussions'
};

@Component({
  selector: 'app-discussions',
  standalone: true,
  imports: [NgFor],
  template: `
    <header class="mb-4">
      <h1 class="mb-1 text-2xl font-semibold">Discussions</h1>
      <p class="mb-1 max-w-lg text-sm opacity-50">From Github</p>
      <hr />
    </header>
    <article class="mb-4" *ngFor="let discussion of discussions(); index as i; trackBy: discussionTrackBy">
      <h2>Title: {{discussion.title}}</h2>
      <p>By: {{discussion.author}}</p>
      <p>Created at: {{discussion.createdAt}}</p>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">View Details</button>
      <hr/>
    </article>
    `,
  styles: [
    `

    `,
  ],
})
export default class DiscussionsComponent implements OnInit {
  private github: GithubService = inject(GithubService);

  discussions: WritableSignal<Array<Discussion>> = signal([]);

  discussionTrackBy(index: number, item: Discussion) {
    return item.number;
  }

  ngOnInit() {
    this.github.getDiscussionList()
        .then(discussions => {
          this.discussions.set(discussions);
        })
        .catch(e => {
          console.log(e);
        });
  }
}
