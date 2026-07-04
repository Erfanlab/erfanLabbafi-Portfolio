import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Lazily loads GSAP + ScrollTrigger on the browser only, once, and memoizes
 * the ready promise so every consumer awaits the same instance. Keeping this
 * out of the SSR/critical path is why gsap isn't imported at the top level
 * of any component.
 */
@Injectable({ providedIn: 'root' })
export class GsapService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private ready: Promise<typeof import('gsap').gsap> | null = null;

  /** Resolves with the configured gsap instance (ScrollTrigger already registered). */
  load(): Promise<typeof import('gsap').gsap> {
    if (!this.isBrowser) {
      // Server / non-browser: never resolves — callers guard with isBrowser anyway.
      return new Promise(() => {});
    }
    if (!this.ready) {
      this.ready = Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
        ([{ gsap }, { ScrollTrigger }]) => {
          gsap.registerPlugin(ScrollTrigger);
          gsap.config({ nullTargetWarn: false });
          return gsap;
        },
      );
    }
    return this.ready;
  }

  get isBrowserEnv(): boolean {
    return this.isBrowser;
  }
}
