var mongoose = require('mongoose');

const dev_db_url = 'mongodb://admin:Lenuska110589@ds125602.mlab.com:25602/shop';

mongoose.connect(dev_db_url, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = {
    'secret' : 'meansecure',
    'db': db
};