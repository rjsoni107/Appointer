const baseFromVite = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_PUBLIC_URL) || '';
const baseFromTag = (typeof document !== 'undefined' && document.querySelector('base') && document.querySelector('base').getAttribute('href')) || '';
const basePath = baseFromVite || baseFromTag || '/';

window.BASE_PATH = basePath;