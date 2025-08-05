import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const yourPhoneNumber = process.env.YOUR_PHONE_NUMBER;

if (!accountSid || !authToken) {
  throw new Error('Twilio credentials are required');
}

const client = twilio(accountSid, authToken);

export interface SMSOptions {
  to?: string;
  message: string;
  from?: string;
}

export class TwilioService {
  static async sendSMS(options: SMSOptions) {
    try {
      const message = await client.messages.create({
        body: options.message,
        from: options.from || twilioPhoneNumber,
        to: options.to || yourPhoneNumber
      });

      console.log(`SMS sent successfully. SID: ${message.sid}`);
      return {
        success: true,
        sid: message.sid,
        status: message.status
      };
    } catch (error) {
      console.error('Error sending SMS:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  static async sendNotification(message: string, to?: string) {
    return this.sendSMS({
      message,
      to: to || yourPhoneNumber
    });
  }

  static async sendWelcomeMessage(username: string) {
    const message = `Welcome ${username}! Your account has been created successfully on AmarnathSite.`;
    return this.sendNotification(message);
  }

  static async sendContactFormNotification(data: { name: string; email: string; message: string }) {
    const message = `New contact form submission:
Name: ${data.name}
Email: ${data.email}
Message: ${data.message}`;
    return this.sendNotification(message);
  }
}

export default TwilioService;
