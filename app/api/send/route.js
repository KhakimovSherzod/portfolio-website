import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sherzodh812@gmail.com', // Your Gmail email address
    pass: 'Ss0987654321Ss' // Your Gmail password or app password if using 2-factor authentication
  }
});

export async function POST(req, res) {
  const { email, subject, message } = await req.json();
  console.log(email, subject, message);
  try {
    // Define email options
    const mailOptions = {
      from: 'sherzodh812@gmail.com', // Sender email address
      to: [fromEmail, email], // Receiver email address
      subject: subject,
      html: `
        <h1>${subject}</h1>
        <p>Thank you for contacting us!</p>
        <p>New message submitted:</p>
        <p>${message}</p>
      ` // Message content in HTML format
    };

    // Send email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' });
  }
}