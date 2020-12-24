module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    dependencies: {
      "@laomao800/vue-listview": "^1.4.0",
    }
  });
  api.render('../vue-install');
  api.onCreateComplete(() => {});
};