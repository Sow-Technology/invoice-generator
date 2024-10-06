import nextConnect from "next-connect";
import multer from "multer";
import { createStore } from "@/app/_actions/store";

// Import multer middleware with GridFS configuration
import { upload } from "@/lib/gridfsConfig"; // Use the GridFS config mentioned earlier

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Something went wrong: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  },
});

// Middleware to handle multipart form data (with file upload)
apiRoute.use(upload.single("file"));

// Handle POST request (uploading the file and creating store data)
apiRoute.post(async (req, res) => {
  try {
    const { code, storeName, phoneNumber, address } = req.body;
    const logoFileId = req.file.id; // The file ID in GridFS

    // Store data along with the logo file ID
    const storeData = {
      code,
      storeName,
      phoneNumber,
      address,
      logoFileId,
    };

    // Create the store in the database
    await createStore(storeData);

    res.status(200).json({ message: "Store created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error creating store: " + err.message });
  }
});

export default apiRoute;
