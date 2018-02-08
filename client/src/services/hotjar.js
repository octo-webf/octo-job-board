export default () => {
  ((h, o, t, j) => {
    window.hj = h.hj || function unnamed() {
      (window.hj.q = h.hj.q || []).push({ h, o, t, j });
    };
    window._hjSettings = { hjid: 772724, hjsv: 6 };
    const head = o.getElementsByTagName('head')[0];
    const script = o.createElement('script');
    script.async = 1;
    script.src = t + window._hjSettings.hjid + j + window._hjSettings.hjsv;
    head.appendChild(script);
  })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
};
