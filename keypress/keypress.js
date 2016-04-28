var keypress = require('keypress');

// Number of active nodes of this type
var keypressNodes = 0;

module.exports = function(RED) {
  function KeyPress(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.key = config.key;

    if(process.stdout.isTTY) {
      process.stdin.setRawMode(true);
    } else {
      node.log('Raw mode not supported in this terminal');
    }

    // Start capturing keypress
    // process.stdin.removeListener('keypress', onKeyPress); // fn is recreated - does not work
    process.stdin.on('keypress', onKeyPress);

    if(keypressNodes === 0) {
      keypress(process.stdin);
      process.stdin.resume();
      node.log('Started keypress capturing');
    }

    keypressNodes++;

    function onKeyPress(ch, key) {

      // Stop capturing when ctrl + c is pressed
      if (key && key.ctrl && key.name == 'c') {
        stopCapturing();
        process.exit();
        return;
      }

      var keyName = key ? key.name : ch;

      // Check whether node.key is set (thats the key we want to capture)
      // Otherwise capture all keys
      if(!node.key || node.key == keyName) {
        // node.log('keypress: ' + keyName);

        var msg = {
          payload: {
            key: keyName
          }
        };

        // Not working for some keys
        // if(key) {
        //   msg.payload.shift = key.shift;
        //   msg.payload.ctrl = key.ctrl;
        // }

        // Send keypress info to flo
        node.send(msg);
      }
    }

    function stopCapturing(log) {
      process.stdin.removeListener('keypress', onKeyPress);

      // Skip removing of keypress capturing when there is another node of this type
      if(keypressNodes > 1) {
        return;
      }

      if(process.stdout.isTTY) {
        process.stdin.setRawMode(false);
      }
      process.stdin.pause();
      node.log('Stopped keypress capturing');
    }

    node.on('close', function() {
      stopCapturing();
      keypressNodes--;
    });
  }
  RED.nodes.registerType('keypress', KeyPress);
}
