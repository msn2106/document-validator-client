// pages/api/validateDocs.js
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Access the form data and file
      const { document, proof } = req.body;
      const file = req.files.file;

      // Validate the data (e.g., check file type, document/proof)
      if (!file) {
        return res.status(400).json({ error: "File is required" });
      }

      // Dummy validation logic
      if (file.mimetype !== "application/pdf" && !file.mimetype.startsWith("image")) {
        return res.status(400).json({ error: "Only PDF and image files are allowed" });
      }

      // If everything is fine, return success
      res.status(200).json({ message: "Document validated successfully" });
    } catch (error) {
      console.error("Validation failed", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
