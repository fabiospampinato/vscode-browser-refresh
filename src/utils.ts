
/* IMPORT */

import {execFile} from 'node:child_process';
import {getConfig, isInsiders} from 'vscode-extras';
import type {Options} from './types';

/* MAIN */

const applescript = ( script: string ): Promise<string> => {

  return new Promise ( ( resolve, reject ) => {

    execFile ( 'osascript', ['-e', script], ( error, stdout, stderr ) => {

      if ( error ) {

        reject ( error );

      } else {

        resolve ( stdout );

      }

    });

  });

};

const getOptions = ( force: boolean ): Options => {

  const config = getConfig ( 'browserRefresh' );
  const browser = isString ( config?.browser ) ? config.browser : 'Google Chrome';
  const delay = isNumber ( config?.delay ) ? config.delay / 1000 : 250;
  const focus = isBoolean ( config?.focus ) ? config.focus : false;
  const options = { browser, delay, focus, force };

  return options;

};

const getScript = ( options: Options ): string => {

  return getScriptSpecific ( options ) || getScriptGeneric ( options );

};

const getScriptGeneric = ( options: Options ): string => {

  const app = isInsiders () ? 'Visual Studio Code - Insiders' : 'Visual Studio Code';

  return `
    tell application "${options.browser}" to activate
    tell application "System Events"
      delay ${options.delay}
      key code 15 using {command down ${options.force ? ', shift down' : ''}} # ⌘R/⇧⌘R
    end tell
    ${options.focus ? '' : `tell application "${app}" to activate`}
  `;

};

const getScriptSpecific = ( options: Options ): string | undefined => {

  const {browser, force, focus} = options;

  if ( force ) return;
  if ( focus ) return;

  if ( browser === 'Google Chrome' ) {
    return 'tell application "Google Chrome" to reload active tab of front window';
  }

  if ( browser === 'Microsoft Edge' ) {
    return 'tell application "Microsoft Edge" to reload active tab of front window';
  }

  if ( browser === 'Safari' ) {
    return 'tell application "Safari" to set URL of current tab of front window to (URL of current tab of front window)';
  }

};

const isBoolean = ( value: unknown ): value is boolean => {

  return typeof value === 'boolean';

};

const isNumber = ( value: unknown ): value is number => {

  return typeof value === 'number';

};

const isString = ( value: unknown ): value is string => {

  return typeof value === 'string';

};

/* EXPORT */

export {applescript, getOptions, getScript, isBoolean, isNumber, isString};
