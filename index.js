const FormData = require('form-data');
const core = require('@actions/core');
const fs = require('fs');

const host = core.getInput('host');
const path = core.getInput('path');
const filePath = core.getInput('filePath');
const data = core.getInput('data');

try {
  fs.existsSync(filePath);
  console.info('File found', filePath);
} catch (e) {
  return console.error('ERROR: file not found:', filePath);
}

const form = new FormData();
form.append('file', fs.createReadStream(filePath));
form.append('data', data);

form.getLength(function (err, l) {
  console.log('Sending file, size:', l + 'b');
});

form.submit({host, path}, function (err, res) {
  if (err) {
    return console.error('ERROR', err);
  }

  console.log('Response', res.statusCode, res.statusMessage);

  if (res.statusCode >= 400 && res.statusCode < 600) {
    console.error('ERROR');
  }
});
