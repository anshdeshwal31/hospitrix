declare namespace NodeJS {
    export interface ProcessEnv {
        PORT: string;
        MONGODB_URI:string;
        JWT_SECRET_KEY:string
    }
}
