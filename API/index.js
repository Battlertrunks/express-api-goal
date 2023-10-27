// Initial setup of routes to use

const apiHook = (api) => {
  api.route('get-data')
    .get();

  api.route('update-data')
    .put();
};