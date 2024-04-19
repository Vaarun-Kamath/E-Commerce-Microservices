const jwt = require('jsonwebtoken');

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTM1MDcxMzQuNjIxLCJleHAiOjE3MTM1MTA3MzQsInVzZXIiOnsidXNlcl9pZCI6IjY2MDkyN2FhMmEwOTVhMDg4NWFkMjBlNyIsIm5hbWUiOiJWYXJ1biBLYW1hdGgiLCJ1c2VybmFtZSI6InZhcnVuayIsImVtYWlsIjoidmFydW5rYW1hdGgwNUBnbWFpbC5jb20ifX0.4b5MQLjee8PASvRWsvzHg9Lhq9yr0nEdc7DxyKxEDlg';
const secret = '3qtJ/GkIjOy9fUT2qU0LfX0qBL+DmyL6vPlPSQUFP9o=';

try {
  const decoded = jwt.verify(token, secret);
  console.log(decoded);
} catch (error) {
  console.error('Failed to decode JWT token:', error);
}
