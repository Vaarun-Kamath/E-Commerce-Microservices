const jwt = require('jsonwebtoken');

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTM4MDQ0NjMuOTQ3LCJleHAiOjE3MTYzOTY0NjMsInVzZXIiOnsidXNlcl9pZCI6IjY2MDkyN2FhMmEwOTVhMDg4NWFkMjBlNyIsIm5hbWUiOiJWYXJ1biBLYW1hdGgiLCJ1c2VybmFtZSI6InZhcnVuayIsImVtYWlsIjoidmFydW5rYW1hdGgwNUBnbWFpbC5jb20ifX0.xu_CfCeUbisXvJWqSuscj31gbxPd_t0rbPXqbcFbYHA';
const secret = 'rm2dDQL1A7gkenleDlX1FmFAMMiLUhCGSnpwdaWnzGc=';

try {
  const decoded = jwt.verify(token, secret);
  console.log(decoded);
} catch (error) {
  console.error('Failed to decode JWT token:', error);
}
