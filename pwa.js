
(function () {
  if (!('serviceWorker' in navigator)) return;
  let refreshing = false;
  window.addEventListener('load', async () => {
    try {
      const manifestLink = document.querySelector('link[rel="manifest"]');
      const manifestUrl = manifestLink ? new URL(manifestLink.getAttribute('href'), window.location.href) : new URL('./manifest.json', window.location.href);
      const swUrl = new URL('service-worker.js', manifestUrl);
      const registration = await navigator.serviceWorker.register(swUrl.href);

      function showUpdate(worker) {
        const toast = document.getElementById('updateToast');
        const button = document.getElementById('reloadAppBtn');
        if (!toast || !button || !worker) return;
        toast.hidden = false;
        button.onclick = () => worker.postMessage({ type: 'SKIP_WAITING' });
      }

      if (registration.waiting) showUpdate(registration.waiting);

      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (!newWorker) return;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            showUpdate(newWorker);
          }
        });
      });

      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return;
        refreshing = true;
        window.location.reload();
      });
    } catch (error) {
      console.error('Registrazione service worker fallita:', error);
    }
  });
})();
