var express = require('express');
var cors = require('cors');
var reveal = require('reveal-sdk-node');

const app = express();

app.use(cors());

const authenticationProvider = async (userContext, dataSource) => {

    if (dataSource instanceof reveal.RVMySqlDataSource) {
        return new reveal.RVUsernamePasswordDataSourceCredential("root", "1qaz2wsx");
    }
    return null;
}

const revealOptions = {
    localFileStoragePath: "data",
    engineLogLevel: "debug",
    authenticationProvider: authenticationProvider
}
app.use('/', reveal(revealOptions));

app.listen(8081, () => {
    console.log(`Reveal server accepting http requests`);
});
