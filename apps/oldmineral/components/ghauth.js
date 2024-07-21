const auth = () => {
  const hostname = 'https://github.com/login/oauth/authorize';
  const clientId = 'fa535b6a0804d984928c';
  const redirect_uri = encodeURIComponent('https://localhost:9002/signedin');
  const scope = 'user';
  const state = 'lasjdlakjsdalksdjalksjdalskjd';

  const completeUrl = `${hostname}?client_id=${clientId}&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}`;

  window.location = completeUrl;
};

export default auth;
