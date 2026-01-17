import mongoose, { Document } from "mongoose";
export interface IRefreshToken extends Document {
    user: mongoose.Types.ObjectId;
    token: string;
    expiresAt: Date;
}
export declare const RefreshToken: mongoose.Model<IRefreshToken, {}, {}, {}, mongoose.Document<unknown, {}, IRefreshToken, {}, mongoose.DefaultSchemaOptions> & IRefreshToken & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IRefreshToken>;
//# sourceMappingURL=refresh.model.d.ts.map