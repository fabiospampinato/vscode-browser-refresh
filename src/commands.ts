
/* IMPORT */

import Script from './script';

/* COMMANDS */

function refresh ( force: boolean ) {

  Script.exec ( Script.get ( force ) );

}

function forceRefresh () {

  return refresh ( true );

}

/* EXPORT */

export {refresh, forceRefresh};
