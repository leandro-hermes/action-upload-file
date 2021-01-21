const FormData = require('form-data');
const core = require('@actions/core');
const fs = require('fs');

const host = core.getInput('host');
const protocol = core.getInput('https') === 'true' ? 'https:' : 'http:';
const path = core.getInput('path');
const filePath = core.getInput('filePath');
const data = core.getInput('data');

console.info('endpoint', host + path);

try {
  fs.existsSync(filePath);
  console.info('File found', filePath);
} catch (e) {
  return core.setFailed('ERROR: file not found: ' + filePath);
}

const form = new FormData();
form.append('file', fs.createReadStream(filePath));
form.append('data', data);

form.getLength(function (err, l) {
  console.info('Sending file, size:', l + 'b');
});

form.submit({host, protocol, path}, function (err, res) {
  if (err) {
    console.error(err);
    return core.setFailed('Request failed');
  }

  console.info('Response', res.statusCode, res.statusMessage);

  if (res.statusCode >= 400 && res.statusCode < 600) {
    core.setFailed('Request failed');
  }
});
