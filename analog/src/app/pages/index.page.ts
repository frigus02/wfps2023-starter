import {RouteMeta} from '@analogjs/router';
import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

export const routeMeta: RouteMeta = {
  title: 'Analog Starter App'
};

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  standalone: true,
  template: `
    <div>
      <a href="https://analogjs.org/" target="_blank">
        <img alt="Analog Logo" class="logo analog" src="/analog.svg" />
      </a>
    </div>

    <h2>Analog</h2>

    <h3>The fullstack meta-framework for Angular!</h3>

    <div class="mb-32 grid text-center lg:mb-0">
        <a
          routerLink="/discussions"
          class="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"

        >
          <h2 class="mb-3 text-2xl font-semibold">
            Discussions
            <span class="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p class="m-0 max-w-lg text-sm opacity-50">
            See discussions in the Github repo.
          </p>
        </a>
      </div>
    <p class="read-the-docs">
      For guides on how to customize this project, visit the
      <a href="https://analogjs.org" target="_blank">Analog documentation</a>
    </p>
  `,
  styles: [
    `
      .logo {
        will-change: filter;
      }
      .logo:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
      }
      .logo.angular:hover {
        filter: drop-shadow(0 0 2em #42b883aa);
      }
      .read-the-docs {
        color: #888;
      }
    `,
  ],
})
export default class HomeComponent {
}
