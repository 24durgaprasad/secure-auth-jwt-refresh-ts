interface RegisterInput {
    username: string;
    email: string;
    password: string;
}
interface LoginInput {
    email: string;
    password: string;
}
export declare const registerUser: ({ username, email, password }: RegisterInput) => Promise<{
    id: import("mongoose").Types.ObjectId;
    username: string;
    email: string;
}>;
export declare const loginUser: ({ email, password }: LoginInput) => Promise<{
    accessToken: string;
    refreshToken: string;
}>;
export declare const refreshAccessToken: (rawToken: string) => Promise<{
    accessToken: string;
    refreshToken: string;
}>;
export declare const logoutUser: (rawToken: string) => Promise<void>;
export {};
//# sourceMappingURL=auth.service.d.ts.map