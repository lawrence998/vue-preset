module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    dependencies: {
      'element-ui': '^2.13.2'
    }
  });
  api.render('../ui/element');
  api.injectImports('src/vendor/index.js', `import './element.js'`);
  api.onCreateComplete(() => {
  });
};
