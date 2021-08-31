import * as newman from 'newman';
import server from './index';

newman.run({
    collection: './test.postman_collection',
    environment: './test.postman_environment',
    reporters: 'cli',
}, (err) => {
	if (err) { throw err; }
    // tslint:disable:no-console
    console.log('collection run complete!');
    server.close();
});