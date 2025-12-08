import type { Preview } from '@storybook/angular'
import { initialize, mswLoader } from 'msw-storybook-addon';
import { applicationConfig } from '@storybook/angular';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { handlers } from '../src/mocks/handlers';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

initialize({
  onUnhandledRequest: 'bypass',
  serviceWorker: {
    url: '/mockServiceWorker.js' // Явно вказуємо шлях до нашого файлу
  }
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    msw: {
      handlers
    }
  },
  loaders: [mswLoader],
  decorators: [
    applicationConfig({
      providers: [
        provideHttpClient(),
        HttpClientModule,
        MatIconRegistry,
        {
          provide: 'APP_INITIALIZER',
          multi: true,
          deps: [MatIconRegistry, DomSanitizer],
          useFactory: (registry: MatIconRegistry, sanitizer: DomSanitizer) => () => {
            registry.setDefaultFontSetClass('material-icons');
          }
        }
      ],
    }),
  ],
} as Preview;

export default preview;
