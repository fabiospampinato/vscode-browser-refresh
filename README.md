# Browser Refresh

<p align="center">
	<img src="https://raw.githubusercontent.com/fabiospampinato/vscode-browser-refresh/master/resources/logo-128x128.png" alt="Logo">
</p>

Refresh the browser with a ⌘R, right from Code. No need to switch focus to it.

It's currently implemented using an AppleScript, which makes this extension **macOS only**. If you know how to do the same on Windows or Linux please submit a PR.

## Install

Follow the instructions in the [Marketplace](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-browser-refresh), or run the following in the command palette:

```shell
ext install fabiospampinato.vscode-browser-refresh
```

## Usage

It adds 1 command to the command palette:

```js
Browser: Refresh // Refresh the browser
```

It adds 1 shortcut:

```js
Cmd+R // Refresh the browser
```

## Settings

```js
{
  "browserRefresh.browser": "Google Chrome" // The browser to refresh
  "browserRefresh.delay": 0 // Delay after which ⌘R will be sent to the browser
}
```

## License

MIT © Fabio Spampinato
