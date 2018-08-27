const mongoose = require('mongoose');
const dev_db_url = 'mongodb://admin:Lenuska110589@ds125602.mlab.com:25602/shop';
const db = mongoose.connection;

mongoose.set('useFindAndModify', false);
mongoose.connect(dev_db_url, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = {
    'secret' : 'meansecure',
    'db': db
};