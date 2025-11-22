import { inject, Injectable, signal } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveManagerService {
  private readonly small = '(max-width: 600px)';
  private readonly medium = '(min-width: 600.01px) and (max-width: 1000px)';
  private readonly large = '(min-width: 1000.01px)';

  private readonly screenWidth = toSignal(
    inject(BreakpointObserver).observe([this.small, this.medium, this.large]),
  );

  public smallWidth = computed(() => this.screenWidth()?.breakpoints[this.small]);
  public mediumWidth = computed(() => this.screenWidth()?.breakpoints[this.medium]);
  public largeWidth = computed(() => this.screenWidth()?.breakpoints[this.large]);

  public sideNavOpened = signal(false);
  public sideNavMode = computed(() => (this.largeWidth() ? 'side' : 'over'));

  public toggleSideNav(): void {
    this.sideNavOpened.set(!this.sideNavOpened());
  }
}
