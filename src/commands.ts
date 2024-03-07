
/* IMPORT */

import {applescript, getOptions, getScript} from './utils';

/* MAIN */

const refresh = ( force?: boolean ): void => {

  applescript ( getScript ( getOptions ( !!force ) ) );

};

const forceRefresh = (): void => {

  refresh ( true );

};

/* EXPORT */

export {refresh, forceRefresh};
