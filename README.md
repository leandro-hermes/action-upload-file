# Upload file javascript action

Uploads a file via HTTP POST using the [form-data](https://github.com/form-data/form-data#readme) package.

## Inputs

### `host`

**Required**. Host of the HTTP server (e.g. example.com).

### `path`

**Required**. Path of the URL to send the file (e.g. /postFile).

### `filePath`

**Required**. Full path of the local file you want to upload (e.g. /home/user/file.zip).

### `https`

Optional. Type `true` whether your request must go on HTTPS. Default `false`.

### `data`

Optional. Additional data you should want to send within the request (e.g. '{"foo":"bar"}').

## Outputs

### `response`

The response from the server.

## Example usage

```yaml
on: pull_request
jobs:
  upload:
    runs-on: ubuntu-latest
    steps:
      - name: Exports the full file path
        id: file
        run: echo "::set-output name=path::$(realpath relative/path/to.file)"

      - uses: leandro-hermes/action-upload-file@v1.0.2
        with:
          host: 'example.com'
          path: '/postFile'
          filePath: ${{ steps.file.outputs.path }}
          data: ${{ toJson(github.event.pull_request) }}
```
