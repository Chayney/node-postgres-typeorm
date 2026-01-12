import express from "express";

// DB接続設定
import { AppDataSource } from "./config/appDataSource";
import "reflect-metadata";

import { todoRouter } from "./routes/todo.route";

const app = express();
const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(() => {
        app.use(express.json());
        app.use('/api', todoRouter);

        app.listen(PORT, () => {
            console.log(`✅ Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('DB connection error', error);
    });
