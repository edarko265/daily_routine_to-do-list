const mongoose = require('mongoose');

const connectDB = async () => {
    const maxRetries = 5;
    let retries = 0;
    while (retries < maxRetries) {
        try {
            await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('MongoDB Connected');
            break;
        } catch (error) {
            retries++;
            console.log(`Retrying connection (${retries}/${maxRetries})...`);
            if (retries >= maxRetries) {
                console.error('Failed to connect to MongoDB:', error);
                process.exit(1);
            }
            await new Promise(res => setTimeout(res, 5000));
        }
    }
};

module.exports = connectDB;