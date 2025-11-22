declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    NEXT_PUBLIC_BASE_URL:string;
    AUTH_SECRET_KEY:string;
    SUPABASE_JWT_SECRET:string;
    SUPABASE_SERVICE_ROLE_KEY:string;
    NEXTAUTH_SECRET:string;
    SUPABASE_URL: string;
    SENDGRID_API_KEY:string;
    SENDGRID_SENDER:string;
    RESEND_API_KEY:string;
    CRON_SECRET:string;
    RESEND_SENDER_EMAIL:string;
  }
}
