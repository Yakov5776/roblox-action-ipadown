const { google } = require('googleapis');

(async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth: await auth.getClient() });

  const spreadsheetId = '1qAN8Eh4iPjO1aECiO1tclTXTLKfCka3StReywLJ3A58';

  const values = [[
    process.env.APP_VER,
    `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`,
    'Yes',
    process.env.APP_VER_ID
  ]];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'ROBLOX',
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values
    },
  });
  

  console.log('Row appended.');
})();