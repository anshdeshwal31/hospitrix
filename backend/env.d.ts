declare namespace NodeJS {
    export interface ProcessEnv {
        PORT: string;
        MONGODB_URI:string;
        JWT_SECRET_KEY:string;
        CLOUDINARY_NAME:string;
        CLOUDINARY_API_KEY:string;
        CLOUDINARY_SECRET_KEY:string;
        ADMIN_EMAIL:string;
        ADMIN_PASSWORD:string;
    }
}
