const dbEnv = {    
    'API-PRODUCTION' : {
        'dbRoute' : 'mongodb+srv://rw-beta:1980Dbz4@cluster0-chh6c.mongodb.net/beta_db?retryWrites=true&w=majority'
    },
    'API-STAGE' : {
        'dbRoute' : 'mongodb+srv://rw-beta:1980Dbz4@cluster0-chh6c.mongodb.net/beta_db?retryWrites=true&w=majority'
    },
    'API-DEV' : {
        'dbRoute' : 'mongodb+srv://rw-beta:1980Dbz4@cluster0-chh6c.mongodb.net/beta_db?retryWrites=true&w=majority'
    }
}

module.exports = dbEnv;