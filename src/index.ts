
/* IMPORT */

import vscode from 'vscode';
import * as Commands from './commands';

/* MAIN */

const activate = (): void => {

  vscode.commands.registerCommand ( 'browserRefresh.refresh', Commands.refresh );
  vscode.commands.registerCommand ( 'browserRefresh.forceRefresh', Commands.forceRefresh );

};

/* EXPORT */

export {activate};
