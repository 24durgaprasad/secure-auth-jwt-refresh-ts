import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoutes);
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/auth_demo";
mongoose.connect(MONGO_URI).then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
});
//# sourceMappingURL=index.js.map