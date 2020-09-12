
/* IMPORT */

import * as applescript from 'applescript';
import Config from './config';
import Utils from './utils';

/* SCRIPT */

const Script = {

  generators: {

    simple: {
      'Google Chrome': 'tell application "Google Chrome" to reload active tab of front window',
      'Microsoft Edge': 'tell application "Microsoft Edge" to reload active tab of front window',
      'Opera': 'tell application "Opera" to reload active tab of front window',
      'Safari': 'tell application "Safari" to set URL of current tab of front window to (URL of current tab of front window)',
    },

    universal: ( force: boolean ) => {

      const {browser, delay, focus} = Config.get (),
              app = Utils.isInsiders () ? 'Visual Studio Code - Insiders' : 'Visual Studio Code';

      return `
        tell application "${browser}" to activate
        tell application "System Events"
          delay ${delay}
          key code 15 using {command down ${ force ? ', shift down' : '' }} # ⌘R/⇧⌘R
        end tell
        ${ focus ? '' : `tell application "${app}" to activate` }
      `;

    }

  },

  exec: ( script: string ): void => {

    applescript.execString ( script );

  },

  get: ( force: boolean ): string => {

    const {browser, focus} = Config.get ();

    if ( !force && !focus && browser in Script.generators.simple ) return Script.generators.simple[browser];

    return Script.generators.universal ( force );

  }

};

/* EXPORT */

export default Script;
