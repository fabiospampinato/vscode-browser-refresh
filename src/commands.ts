
/* IMPORT */

import * as applescript from 'applescript';
import * as vscode from 'vscode';
import Config from './config';
import Utils from './utils';

/* COMMANDS */

function refresh () {

  const {browser, delay, focus} = Config.get (),
        app = Utils.isInsiders () ? 'Visual Studio Code - Insiders' : 'Visual Studio Code';

  const refreshScript = `
    tell application "System Events"
      tell application "${browser}" to activate
      delay ${delay}
      key code 15 using {command down} # ⌘R
      ${ focus ? '' : `do shell script "open -a \\"${app}\\""` }
    end tell
  `;

  applescript.execString ( refreshScript );

}

/* EXPORT */

export {refresh};
