var easymidi = require('easymidi');
const OBSWebSocket = require('obs-websocket-js');

//List Inputs and Outputs
var inputs = easymidi.getInputs();
var outputs = easymidi.getOutputs();
console.log("Inputs: " + inputs.toString());
console.log("Outputs: " +  outputs.toString());


var input = new easymidi.Input('loopMIDI Port 0');
var output = new easymidi.Output('Scarlett 8i6 USB 3');


const obs = new OBSWebSocket();
obs.connect({ address: 'localhost:4444', password: '$up3rSecretP@ssw0rd' })
  .then(() => {
	  console.log('Success! We\'re connected & authenticated.');
	  return obs.getSceneList({});
  })
  .then(data => {
  	console.log(`${data.scenes.length} Available Scenes!`);
    data.scenes.forEach(scene => {
      if (scene.name !== data.currentScene) {
        console.log('Found a different scene! Switching to Scene:', scene.name);
      }
    });
  })
  .catch(err => { // Ensure that you add a catch handler to every Promise chain.
    console.log(err);
  });

obs.onSwitchScenes(data => {
  console.log('New Active Scene:', data.sceneName);
});

// You must add this handler to avoid uncaught exceptions.
obs.on('error', err => {
	console.error('socket error:', err);
});



input.on('noteon', function (msg) {
  console.log(msg);
  switch (msg.note) {
    case 60:
        obs.setCurrentScene({'scene-name': "60"});
        break;
    case 61:
        obs.setCurrentScene({'scene-name': "61"});
        break;
    case 62: 
        obs.setCurrentScene({'scene-name': "62"});
        break;
    case 63:
        obs.setCurrentScene({'scene-name': "63"});
        break;
    case 65:
        obs.setCurrentScene({'scene-name': "65"});
        break;
    case 66:
        obs.setCurrentScene({'scene-name': "66"});
  };
});

// input.on('noteon', function (msg) {
//     console.log(msg);
//     switch (msg.note) {
//       case 60:
//           obs.setTextGDIPlusProperties({'source': "test", 'text': "60"});
//           break;
//       case 61:
//           obs.setTextGDIPlusProperties({'source': "test", 'text': "61"});
//           break;
//       case 62: 
//           obs.setTextGDIPlusProperties({'source': "test", 'text': "62"});
//           break;
//       case 63:
//           obs.setTextGDIPlusProperties({'source': "test", 'text': "63"});
//           break;
//       case 65:
//           obs.setTextGDIPlusProperties({'source': "test", 'text': "65"});
//           break;
//       case 66:
//           obs.setTextGDIPlusProperties({'source': "test", 'text': "66"});
//     };
//   });