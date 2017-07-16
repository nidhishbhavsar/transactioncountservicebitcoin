var IDBService = require('../../IDBService');
var connectionPool = require('./connection.js');
var RSVP = require('rsvp');

class MySqlDBServiceImp extends IDBService {
    getAddressesData() {
        return new RSVP.Promise(function (fulfill, reject) {
            connectionPool.getConnection(function (err, connection) {
                if (err) {
                    throw Error();
                    return;
                }

                connection.query('SELECT * from addresses_summary', function (err, rows, fields) {
                    connection.release();
                    if (!err && rows && rows.length > 0) {
                        var addresses = [];
                        var addressesCount = [];
                        for (var i = 0; i < rows.length; i++) {
                            var addressData = row[i];
                            addresses.push(addressData.address);
                            addressesCount.push(addressData.address_count);
                        }
                        fulfill({
                            addresses: addresses,
                            addressesCount: addressesCount
                        })
                    } else {
                        //TODO implement reject exception
                        fulfill(null);
                    }
                });
            });
        });
    }
    
    setAddressData(address, count) {
        connectionPool.getConnection(function (err, connection) {
            if (err) {
                throw Error();
                return;
            }

            var updateQuery = "UPDATE addresses_summary SET address_count = " + count + " WHERE address = '" + address + "'";
            connection.query(updateQuery, function (err, result) {
                if (err) throw err;               
            });
        });
    }
}

module.exports = MySqlDBServiceImp;