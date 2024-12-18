import Mailjet from 'node-mailjet';
import { Client, SendEmailV3_1, LibraryResponse } from 'node-mailjet';

const sendMailMulti = async (
  fromEmail: string,
  toEmail: string[],
  subject: string,
  htmlContent: string,
  textContent?: string
): Promise<LibraryResponse<SendEmailV3_1.Response> | null> => {
  try {
    const mailjet = new Mailjet.Client({
      apiKey: process.env.MJ_API,  // Public API key
      apiSecret: process.env.MJ_SECRET,  // Private API key
    });

    const request: SendEmailV3_1.Body = {
      Messages: [
        {
          From: {
            Email: fromEmail,  // Sender email
          },
          To: toEmail.map((email) => ({ Email: email })),
          Subject: subject,  // Email subject
          HTMLPart: htmlContent,  // HTML content
          TextPart: textContent || htmlContent,  // Fallback to HTML if text not provided
        },
      ],
    };

    // Send the email
    const response: LibraryResponse<SendEmailV3_1.Response> = await mailjet
      .post('send', { version: 'v3.1' })
      .request(request);
    
    console.log('Email sent successfully:', response.body);
    return response;  // Return the full response, not just the body
  } catch (error) {
    console.error('Failed to send email:', error);
    return null;
  }
};

export default sendMailMulti;
