import mongoose, { Schema, Document } from "mongoose";
const refreshTokenSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
}, { timestamps: true });
export const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
//# sourceMappingURL=refresh.model.js.map