export interface Auth {
    result: { username: any; };
    id?: string;
    username?: string;
    password?: string;
    status?: string;
    token?: string | null;
    refreshToken?: string | null;
}
