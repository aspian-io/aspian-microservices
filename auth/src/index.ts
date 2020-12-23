import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
// Importing routers
import {currentUserRouter} from "./routes/current-user";
import {signupRouter} from "./routes/signup";
import {signinRouter} from "./routes/signin";
import {signoutRouter} from "./routes/signout";
// Importing middlewares
import {errorHandler} from "./middlewares/error-handler";
import {NotFoundError} from "./errors/not-found-error";

const app = express();
app.use(express.json());

/// Routes
// auth
app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

// If route does not exist
app.all('*', async () => {
    throw new NotFoundError();
})

/// Middlewares
// Error handler
app.use(errorHandler);

//
const start = async () => {
    try {
        // Connecting to MongoDb
        await mongoose.connect('mongodb://auth-mongo:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Connected to MongoDb');
    } catch (err) {
        console.log(err);
    }

    // Express start listening config
    app.listen(3000, () => {
        console.log("Listening on port 3000!");
    })
}

start();