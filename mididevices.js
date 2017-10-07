// midi.js
const midi = require( 'midi' );


module.exports = {
  /**
   * Use property to store kind of a global input object,
   * so we won't create a new MIDI instance all the time
   */
  input: null,

  /**
   * Returns a list of device names
   */
  list: function() {
    if ( !this.input ) {
      this.input = new midi.input();
    }
    const devices = [];
    const size = this.input.getPortCount();

    for ( let i = 0; i < size; i += 1 ) {
      devices.push( this.input.getPortName( i ) );
    }
console.log(devices);
    return devices;
    
  },
};


module.list();