import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://nehasahajwani.github.io',
  base: '/mirchibyneha',
  integrations: [tailwind({ applyBaseStyles: false })],
});
