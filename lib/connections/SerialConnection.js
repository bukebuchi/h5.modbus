var util = require('util');
var Connection = require('../Connection');

module.exports = SerialConnection;

/**
 * @name h5.modbus.connections.SerialConnection
 * @constructor
 * @extends {h5.modbus.Connection}
 * @param {serialport.SerialPort} serialPort
 * @event error
 * @event data
 */
function SerialConnection(serialPort)
{
  Connection.call(this);

  /**
   * @private
   * @type {serialport.SerialPort}
   */
  this.serialPort = this.setUpSerialPort(serialPort);
}

util.inherits(SerialConnection, Connection);

/**
 * @param {Buffer} data
 */
SerialConnection.prototype.write = function(data)
{
  try
  {
    this.serialPort.write(data);
  }
  catch (err)
  {
    this.emit('error', err);
  }
};

/**
 * @private
 * @param {serialport.SerialPort} serialPort
 * @return {serialport.SerialPort}
 */
SerialConnection.prototype.setUpSerialPort = function(serialPort)
{
  serialPort.on('error', this.emit.bind(this, 'error'));

  serialPort.on('data', this.emit.bind(this, 'data'));

  return serialPort;
};