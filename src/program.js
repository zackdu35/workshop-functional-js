let chalk = require('chalk');
let _ = require('lodash');
let checkpointsService = require('./staticCheckpoints');


let calculateDistanceWithRssi = rssi => {
  var txPower = -59; // hard coded power value. Usually ranges between -59 to -65
  if (rssi == 0) {
    return -1.0;
  }
  var ratio = rssi * 1.0 / txPower;
  if (ratio < 1.0) {
    return Math.pow(ratio,10);
  } else {
    var distance = (0.89976) * Math.pow(ratio, 7.7095) + 0.111;
    return Math.round(distance*100)/100;
  }
};

let transformCheckpoint = (checkpoint) => {
  if (checkpoint) {

    var copieCP = Object.assign({}, checkpoint);
    // Get back essential properties
    copieCP.serviceData = copieCP.advertisement.serviceData;
    copieCP.serviceUuids = copieCP.advertisement.serviceUuids;
    // Transform data about distance
    copieCP.distance = calculateDistanceWithRssi(copieCP.rssi);
    // Clean uninteresting properties
    delete copieCP.id;
    delete copieCP.address;
    delete copieCP.addressType;
    delete copieCP.advertisement;
    delete copieCP.rssi;
    delete copieCP.services;
    // Everything is ok
    return copieCP;
  } else {
    return false;
  }
};

let showCheckpoint = (checkpoint, index) => {

  console.log(chalk.green('CHECKPOINT'), chalk.yellow(index + 1));
  return _.map(checkpoint, (value, key) => {
    if(checkpoint[key]){
      console.log(chalk.cyan(key.toUpperCase()), value);
    }
  });
  console.log('\n');

};


let run = () => {
  let checkpoints = checkpointsService.getCheckpoints();
    
  return _.chain(checkpoints)
  .map((checkpoint, index) => {
    return showCheckpoint(transformCheckpoint(checkpoint), index);
  })
  .value();

};

module.exports = {
  transformCheckpoint: transformCheckpoint,
  showCheckpoint: showCheckpoint,
  run: run
};