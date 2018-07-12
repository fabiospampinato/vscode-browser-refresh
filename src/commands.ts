
/* IMPORT */

import * as applescript from 'applescript';
import Config from './config';
import Utils from './utils';

/* COMMANDS */

function refresh ( force ) {

  const {browser, delay, focus} = Config.get (),
        app = Utils.isInsiders () ? 'Visual Studio Code - Insiders' : 'Visual Studio Code';

  const refreshScript = `
    tell application "${browser}" to activate
    tell application "System Events"
      delay ${delay}
      key code 15 using {command down ${ force ? ', shift down' : '' }} # ⌘R/⇧⌘R
    end tell
    ${ focus ? '' : `tell application "${app}" to activate` }
  `;

  applescript.execString ( refreshScript );

}

function forceRefresh () {

  return refresh ( true );

}

/* EXPORT */

export {refresh, forceRefresh};
