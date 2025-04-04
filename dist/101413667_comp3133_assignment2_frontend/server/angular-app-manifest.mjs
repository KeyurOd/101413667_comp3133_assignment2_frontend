
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 7473, hash: '450f19d31e9701e5ff9ff876aec1b5a062cdc9e7cf95c02a644735f2610f1e7e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 995, hash: '2522497ad099f9b203629f95bb76cc886419f32d6719c3129cf7d7b0b2326dc0', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 28940, hash: 'a57c37ff22d08364dc578d06321e10d0de2e733f2a16d5b1896cefe1a3c7ffd5', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-NWSEQDTB.css': {size: 7175, hash: 'skdnj8NnwzQ', text: () => import('./assets-chunks/styles-NWSEQDTB_css.mjs').then(m => m.default)}
  },
};
