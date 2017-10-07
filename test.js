const OBSWebSocket = require('obs-websocket-js');

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
        obs.setCurrentScene({'scene-name': scene.name});
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


