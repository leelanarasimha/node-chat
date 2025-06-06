const dns = require('dns/promises');

(async () => {
  try {
    const result = await dns.lookup('google.com', { family: 4 });
    console.log(result);
  } catch (e) {
    console.log('error', e);
  }
})();
