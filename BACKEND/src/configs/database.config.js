const mongo = require('mongoose');

const dbConnect = () => {
    mongo.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
        }
        ).then(
            () => console.log("DB connect successfully....."),
            (error) => console.log(error)
        )
};

module.exports = dbConnect;