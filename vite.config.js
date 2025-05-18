// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import path from 'path';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
//   build: {
//     rollupOptions: {
//       // Make sure to include date-fns and any other problematic dependencies
//       external: [],
//       // Ensure date-fns is properly bundled
//       output: {
//         manualChunks: {
//           'date-fns': ['date-fns'],
//         },
//       },
//     },
//   },
// });