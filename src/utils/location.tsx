const updateLocation = (route: string) => {
  const newLocation = { pathname: route };
  window.history.pushState(null, '', newLocation.pathname);
};


export default updateLocation