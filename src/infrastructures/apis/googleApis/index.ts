import { google } from 'googleapis';
import { logger } from '@/app';

// When putting the values, Do not comment out console.log in order to protect secret info.
// console.log('DELETE ENV!!');
const option = {
  clientId: '',
  clientSecret: '',
  redirectUri: '',
};

/**
 * Create a new OAuth2 client with the configured keys.
 */
const oauth2Client = new google.auth.OAuth2(option);

/**
 * This is one of the many ways you can configure googleapis to use authentication credentials.  In this method, we're setting a global reference for all APIs.  Any other API you use here, like google.drive('v3'), will now use this auth client. You can also override the auth client at the service and method call levels.
 */
google.options({ auth: oauth2Client });

// ------AUTHORIZATION API
const scopes = [
  'https://www.googleapis.com/auth/contacts.readonly',
  'https://www.googleapis.com/auth/user.emails.read',
  'profile',
];
// authenticate(scopes)
//   .then((client) => getPeopleSrc(client))
//   .catch(logger.error);

const optionsForAuthURl = {
  access_type: 'offline',
  scope: scopes.join(' '),
};

export const getAuthorizeUrl = async () => {
  return oauth2Client.generateAuthUrl(optionsForAuthURl);
};

export const setAccessToken = async (code: string) => {
  const { tokens } = await oauth2Client.getToken(code);
  logger.debug({ tokens });
  logger.debug(oauth2Client);
  logger.debug('BEFORE oauth2Client');
  oauth2Client.setCredentials(tokens);
  logger.debug('AFTER oauth2Client');
  logger.debug(oauth2Client);
  return;
};

const people = google.people({
  version: 'v1',
  auth: oauth2Client,
});

const getPeopleParams = {
  resourceName: 'people/me',
  personFields: 'emailAddresses,names',
};

export const getPeopleSrc = async () => {
  //   const { tokens } = await oauth2Client.getToken(code);
  //   logger.debug({ tokens });
  //   oauth2Client.setCredentials(tokens);
  logger.debug('BEFORE GETTING PEOPLE INFO oauth2Client');
  logger.debug(oauth2Client);
  const res = await people.people.get(getPeopleParams).catch((e) => logger.error(e));
  logger.debug(res);
  logger.debug('AFTER GETTING PEOPLE INFO oauth2Client');
  logger.debug(oauth2Client);
  return res?.data;
};

/**
 * Open an http server to accept the oauth callback. In this simple example, the only request to our webserver is to /callback?code=<code>
 */
// async function authenticate(scopes: string[]) {
//   return new Promise((resolve, reject) => {
//     // grab the url that will be used for authorization
//     const authUrl = oauth2Client.generateAuthUrl({
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
//         opn(authUrl, { wait: false }).then((cp) => cp.unref());
//       });
//     destroyer(server);
//   });
// }
