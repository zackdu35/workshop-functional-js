var expect = require('chai').expect;

var transformCheckpoint = require('../src/program').transformCheckpoint;

var testData = {
  id: 'whataw0nd3rful1d',
  uuid: 'whataw0nd3rful1d',
  address: 'unknown',
  addressType: 'unknown',
  connectable: false,
  advertisement: {
    localName: undefined,
    txPowerLevel: undefined,
    manufacturerData: undefined,
    serviceData: [],
    serviceUuids: [ 'abcd' ]
  },
  rssi: -66,
  services: null,
  state: 'outofcontrol'
}


describe('Function transformCheckpoint', function() {

  it('Function transformCheckpoint without parameter should return false', function() {
    expect(transformCheckpoint()).to.be.false;
  });

});


describe('Function transformCheckpoint', function() {

  it('Function transformCheckpoint parameter should be mutated', function() {
    expect(transformCheckpoint(testData.connectable)).to.eql.true;
  });

});