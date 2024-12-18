// pages/index.js
import { useState } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";
import Head from "next/head";

const Home = () => {
  const [selectedDocument, setSelectedDocument] = useState("");
  const [selectedProof, setSelectedProof] = useState("");
  const [file, setFile] = useState(null);

  const handleDocumentChange = (e) => setSelectedDocument(e.target.value);
  const handleProofChange = (e) => setSelectedProof(e.target.value);
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !selectedDocument || !selectedProof) {
      alert("Please fill in all fields and upload a file.");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("document", selectedDocument);
    formData.append("proof", selectedProof);
    formData.append("file", file);

    try {
      const response = await axios.post("/api/validateDocs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Document validated successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error validating document:", error);
      alert("Error validating document.");
    }
  };

  return (
    <>
      <Head>
        <title>Document Validator</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>Document Validator</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="document" className={styles.label}>Select Document</label>
            <select
              id="document"
              value={selectedDocument}
              onChange={handleDocumentChange}
              required
              className={styles.select}
            >
              <option value="">-- Select Document --</option>
              <option value="passport">Passport</option>
              <option value="drivers_license">Driver's License</option>
              <option value="id_card">ID Card</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="proof" className={styles.label}>Select Proof</label>
            <select
              id="proof"
              value={selectedProof}
              onChange={handleProofChange}
              required
              className={styles.select}
            >
              <option value="">-- Select Proof --</option>
              <option value="address_proof">Address Proof</option>
              <option value="identity_proof">Identity Proof</option>
              <option value="birth_certificate">Birth Certificate</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="file" className={styles.label}>Upload File (PDF/Image)</label>
            <input
              type="file"
              id="file"
              accept=".pdf,image/*"
              onChange={handleFileChange}
              required
              className={styles.fileInput}
            />
          </div>

          <button type="submit" className={styles.button}>Validate Docs</button>
        </form>
      </div>
    </>
  );
};

export default Home;
