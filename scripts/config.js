require.config({
  baseUrl: '../scripts/lib',
  paths: {
    'app': '../app',
    'jquery': [
      'http://cdn.staticfile.org/jquery/1.10.2/jquery.min',
      'jquery'
    ],
    'jquery.chosen': 'chosen/chosen.jquery',
    'jquery.validator': 'validator/validator',
    'jscal2': 'jscal2/js/jscal2'
  },
  shim: {
    'jquery.accordion': { deps: ['jquery'] },
    'jquery.calendar': { deps: ['jquery', 'jscal2'] },
    'jquery.chosen': { deps: ['jquery'] },
    'jquery.dialog': { deps: ['jquery', 'artDialog/artDialog', 'artDialog/plugins/iframeTools'] },
    'jquery.fixedHead': { deps: ['jquery'] },
    'jquery.tab': { deps: ['jquery'] },
    'jquery.validator': { deps: ['jquery'] }
  }
});
