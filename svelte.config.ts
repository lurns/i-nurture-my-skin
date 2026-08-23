import adapter from '@sveltejs/adapter-static'

export default {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html' // needed for client-side routing on a static host
    })
  }
}