
const app = require("./src/app");
const connectDB = require("./src/db/db");
require("dotenv").config();

async function startServer() {
    try {
        await connectDB();

        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    } catch (err) {
        console.log("Database connection failed:", err);
    }
}

startServer();