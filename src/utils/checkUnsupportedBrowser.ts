const checkUnsupportedBrowser = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return (
    (userAgent.indexOf('safari') > -1 &&
      userAgent.indexOf('chrome') <= -1 &&
      userAgent.indexOf('chromium') <= -1) ||
    (userAgent.indexOf('firefox') > -1 && userAgent.indexOf('seamonkey') <= -1)
  );
};

export default checkUnsupportedBrowser;
