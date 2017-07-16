var environment = require('./environment');
var DBProviderFactory = require('./DBService/DBProviderFactory');
var dbInstance = DBProviderFactory.getInstance(environment.CURRENT_DB_PROVIDER);

class AddressService {
    checkAddress(address) {
        dbInstance.getAddressesData().then(function (addressesDataObj) {
            var addresses = addressesDataObj.addresses;
            var addressesCount = addressesDataObj.addressesCount;
            if (addresses && Array.isArray(addresses) && addresses.length > 0 && addresses.indexOf(address)) {
                var addressIndex = addresses.indexOf(address);
                var addressCount = ++addressesDataObj.addressesCount[addressIndex];
                this.print(addressesDataObj);
                dbInstance.setAddressData(address, addressCount);
            }
        }.bind(this));
    }

    print(addressesDataObj) {
        var addresses = addressesDataObj.addresses;
        var addressesCount = addressesDataObj.addressesCount;
        for (index in addresses) {
            console.log("Address : " + addresses[index] + " occures : " + addressesCount[index]);
        }
    }
}

module.exports = AddressService;