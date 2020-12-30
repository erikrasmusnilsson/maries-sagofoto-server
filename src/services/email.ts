import nodemailer from 'nodemailer';

const email = () => {
  return nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASSWORD!,
    },
  });
};

const sendMail = async (subject: string, content: string) => {  
  const opts = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECEIVER,
    subject,
    text: content
  }

  await email().sendMail(opts);
};

export { sendMail };