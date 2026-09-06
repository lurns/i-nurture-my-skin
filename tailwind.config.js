import { addDynamicIconSelectors } from '@iconify/tailwind4';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [
    addDynamicIconSelectors(), // Adds icon support
  ],
}
