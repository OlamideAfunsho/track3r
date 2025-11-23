import * as sgMail from '@sendgrid/mail';

const API_KEY = process.env.SENDGRID_API_KEY;

if (API_KEY) {
    sgMail.setApiKey(API_KEY);
} else {
    console.error("SENDGRID_API_KEY is missing! Emails will not send.");
}

const SENDER_EMAIL = process.env.SENDGRID_SENDER_EMAIL || "default@example.com"; 

export async function sendEmail(to: string, subject: string, html: string) {
    if (!API_KEY) {
        throw new Error("Email service is not configured. Missing API key.");
    }
    
    const msg = {
        to: to,
        from: SENDER_EMAIL, 
        subject: subject,
        html: html,
    };

    try {
        await sgMail.send(msg);
        return true;
    } catch (error: any) {
        console.error("SendGrid Email Error:", error);
        
        // Check for common error structure if available
        if (error.response?.body?.errors) {
             console.error("SendGrid Details:", error.response.body.errors);
        }
        
        // Re-throw the error so the calling API route can handle it
        throw new Error(`Failed to send email via SendGrid: ${error.message}`);
    }
}