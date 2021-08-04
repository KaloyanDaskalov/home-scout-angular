export interface User {
    uid?: string | undefined;
    email?: string | undefined;
    displayName?: string | undefined;
    updateEmail(email:string): Promise<void>;
    updatePassword(password:string): Promise<void>;
    delete(): Promise<void>;
}