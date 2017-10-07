// midiInputChangeListener.js
const midi = require( './midi' );

function checkDeviceListChange( callback = () => {}, length = 0 ) {
  const newDeviceList = midi.list();
  let newLength = length;

  if ( newLength !== newDeviceList.length ) {
    newLength = newDeviceList.length;
    callback( newDeviceList );
  }

  setTimeout( () => { // this line should be changed to be more async
    process.nextTick( () => { checkDeviceListChange( callback, newLength ) } );
  }, 100 );
}

module.exports = function( callback = () => {} ) {
  let deviceList = [];

  checkDeviceListChange( ( newDeviceList ) => {
    oldDeviceList = [ ...deviceList ];
    deviceList = newDeviceList;
    callback( deviceList, oldDeviceList );
  } );
}