
/* IMPORT */

import {exec, getConfig, isInsiders} from 'vscode-extras';
import type {Options} from './types';

/* MAIN */

const applescript = async ( script: string ): Promise<void> => {

  await exec ( 'osascript', ['-e', script] );

};

const getOptions = ( force: boolean ): Options => {

  const config = getConfig ( 'browserRefresh' );
  const browser = isString ( config?.browser ) ? config.browser : 'Google Chrome';
  const delay = isNumber ( config?.delay ) ? config.delay / 1000 : 250;
  const focus = isBoolean ( config?.focus ) ? config.focus : false;

  return { browser, delay, focus, force };

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

  if ( browser === 'Google Chrome' || browser === 'chrome' ) {
    return 'tell application "Google Chrome" to reload active tab of front window';
  }

  if ( browser === 'Microsoft Edge' || browser === 'edge' ) {
    return 'tell application "Microsoft Edge" to reload active tab of front window';
  }

  if ( browser === 'Safari' || browser === 'safari' ) {
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
