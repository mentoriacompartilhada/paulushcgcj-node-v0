const newman = require('newman');
const app = require('./index').default;

newman.run({
    collection: './test.postman_collection',
    environment: './test.postman_environment',
    reporters: 'cli',
}, function (err) {
	if (err) { throw err; }
    console.log('collection run complete!');
    app.close();
});