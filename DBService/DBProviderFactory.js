var constants = require('../constants');
var MySqlDBServiceImp = require('./DBProvider/mysql/MySqlDBServiceImp');

class DBProviderFactory {
    getInstance(dbProvider) {
        var dbInstance = null;
        switch (dbProvider) {
            case constants.MY_SQL_DB_PROVIDER:
                dbInstance = new MySqlDBServiceImp();                                
                break;
            default:
                break;
        }
        return dbInstance;
    }
}

module.exports = new DBProviderFactory();