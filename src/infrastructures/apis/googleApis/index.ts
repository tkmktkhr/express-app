import { google } from 'googleapis';
import { logger } from '@/app';

const people = google.people('v1');

const option = {
  clientId: '',
  clientSecret: '',
  redirectUri: 'http://localhost:8080',
};

/**
 * Create a new OAuth2 client with the configured keys.
 */
const oauth2Client = new google.auth.OAuth2(option);

/**
 * This is one of the many ways you can configure googleapis to use authentication credentials.  In this method, we're setting a global reference for all APIs.  Any other API you use here, like google.drive('v3'), will now use this auth client. You can also override the auth client at the service and method call levels.
 */
google.options({ auth: oauth2Client });

/**
 * Open an http server to accept the oauth callback. In this simple example, the only request to our webserver is to /callback?code=<code>
 */
// async function authenticate(scopes: string[]) {
//   return new Promise((resolve, reject) => {
//     // grab the url that will be used for authorization
//     const authorizeUrl = oauth2Client.generateAuthUrl({
//       access_type: 'offline',
//       scope: scopes.join(' '),
//     });
//     const server = http
//       .createServer(async (req, res) => {
//         try {
//           if (req.url.indexOf('/oauth2callback') > -1) {
//             const qs = new url.URL(req.url, 'http://localhost:3000').searchParams;
//             res.end('Authentication successful! Please return to the console.');
//             server.destroy();
//             const { tokens } = await oauth2Client.getToken(qs.get('code'));
//             oauth2Client.credentials = tokens; // eslint-disable-line require-atomic-updates
//             resolve(oauth2Client);
//           }
//         } catch (e) {
//           reject(e);
//         }
//       })
//       .listen(3000, () => {
//         // open the browser to the authorize url to start the workflow
//         opn(authorizeUrl, { wait: false }).then((cp) => cp.unref());
//       });
//     destroyer(server);
//   });
// }

export const runSample = async () => {
  // retrieve user profile
  //   const { tokens } = await oauth2Client.getToken(qs.get('code'));
  //   oauth2Client.credentials = tokens; // eslint-disable-line require-atomic-updates
  const res = await people.people.get({
    resourceName: 'people/me',
    personFields: 'emailAddresses',
  });
  logger.debug(res.data);
  return res.data;
};

const scopes = [
  'https://www.googleapis.com/auth/contacts.readonly',
  'https://www.googleapis.com/auth/user.emails.read',
  'profile',
];
// authenticate(scopes)
//   .then((client) => runSample(client))
//   .catch(logger.error);

export const getAuthorizeUrl = async () => {
  // grab the url that will be used for authorization
  const authorizeUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes.join(' '),
  });

  logger.debug(authorizeUrl);

  return authorizeUrl;
};
