import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import { getSession } from 'next-auth/react';

// Initialize S3 client with environment variables
const s3 = new S3Client({
  region: process.env.AWS_REGION, // Use the AWS region from the environment variables
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Access key ID
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Secret access key
  },
});

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parser to handle file upload manually
  },
};

// Function to upload files to AWS S3
const uploadToS3 = (filePath, fileName) => {
  const fileContent = fs.readFileSync(filePath); // Read the file content from the temporary file path
  const params = {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME, // Your S3 bucket name (can still use NEXT_PUBLIC for public bucket name)
    Key: fileName, // The file name (path) in the bucket
    Body: fileContent, // The file content to be uploaded
    ContentType: 'image/jpeg', // Update based on file type
  };

  const command = new PutObjectCommand(params);
  return s3.send(command); // Upload the file using v3
};

export default async function handler(req, res) {
  // Step 1: Check if user is authenticated
  const session = await getSession({ req }); // Get session from the request

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized. Please log in to upload.' });
  }

  if (req.method === 'POST') {
    const form = new IncomingForm(); // Create a new instance of IncomingForm

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return res.status(500).json({ error: 'Error parsing form data' });
      }

      const file = files.file[0]; // Assuming the form field name is 'file'
      const filePath = file.filepath;
      const fileName = file.originalFilename; // Get the original file name

      try {
        // Step 2: Upload the file to S3
        const result = await uploadToS3(filePath, fileName);
        return res.status(200).json({ message: 'Upload successful', result });
      } catch (uploadError) {
        console.error('Error uploading file to S3:', uploadError);
        return res.status(500).json({ error: 'Error uploading to S3', details: uploadError.message });
      }
    });
  } else {
    return res.status(405).json({ error: 'Method not allowed' }); // Handle unsupported HTTP methods
  }
}
