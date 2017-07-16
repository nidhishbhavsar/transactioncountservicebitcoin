var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;
var bitcore = require('bitcore-lib');
var AddressService = require('./AddressService');

function TransactionCountService(options) {
  EventEmitter.call(this);
  this.node = options.node;
  this.node.services.bitcoind.on('tx', this.transactionHandler.bind(this));
}
inherits(TransactionCountService, EventEmitter);

TransactionCountService.dependencies = ['bitcoind'];

TransactionCountService.prototype.start = function (callback) {
  console.log("TransCount service Started");
  setImmediate(callback);
};

TransactionCountService.prototype.stop = function (callback) {
  console.log("TransCount service Stoped");
  setImmediate(callback);
};

TransactionCountService.prototype.getAPIMethods = function () {
  return [];
};

TransactionCountService.prototype.getPublishEvents = function () {
  return [];
};

TransactionCountService.prototype.transactionHandler = function (txBuffer) {
  var self = this;
  console.log("Transaction occure");
  var tx = bitcore.Transaction().fromBuffer(txBuffer);

  for (var i = 0; i < tx.inputs.length; i++) {
    self.transactionInputHandler(tx.inputs[i]);
  }

};

TransactionCountService.prototype.transactionInputHandler = function (input) {
  if (!input.script) {
    return;
  }
  var address = input.script.toAddress(this.node.network);
  if (address) {
    addressService = new AddressService();
    addressService.checkAddress(address);
  }
};

module.exports = TransactionCountService;
