import Header from '@/components/Header';

const createFavicon = (color = '#ED9F25', letter = 't') => {
  var canvas = document.createElement('canvas');
  var strData;

  canvas.setAttribute('width', 100);
  canvas.setAttribute('height', 100);

  const ctx = canvas.getContext('2d');
  ctx.arc(50, 50, 50, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();

  // Draw letter 't'
  ctx.fillStyle = 'white';
  ctx.font = 'bold normal 90px monospace';
  ctx.fillText(letter, 25, 75);

  strData = canvas.toDataURL('image/png', 1.0);
  replaceFavicon(strData);

  // const link = document.createElement('a');
  // link.download = `${'textmarkr'}.png`;
  // link.href = strData;
  // link.click();
};

const replaceFavicon = (srcData) => {
  document.head || (document.head = document.getElementsByTagName('head')[0]);
  const link = document.createElement('link');
  link.type = 'image/x-icon';
  link.id = 'dynamic-favicon';
  link.rel = 'shortcut icon';
  link.href = srcData;

  // We've got to remove ALL favicons
  const oldLinks = document.querySelectorAll('[type="image/x-icon"]');
  oldLinks.forEach((oldLink) => {
    document.head.removeChild(oldLink);
  });

  document.head.appendChild(link);
};

const DynamicIcon = () => (
  <div>
    <Header />
  </div>
);

export default DynamicIcon;
