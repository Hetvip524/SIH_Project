import React, { useState } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import axios from "axios";
import '../Design/AddStudent.css';

const AddStudent = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isError , setIsError] = useState(false)
  const [successMessage, setSuccessMessage] = useState("");

  const requiredFields = ["studentId", "name", "department", "rollNo", "semester", "year"];

  const validateHeaders = (headers) => {
    return requiredFields.every((field) => headers.includes(field));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setError("");
      setSuccessMessage("");
      setData([]);

      if (file.type === "text/csv" || file.name.endsWith(".csv")) {
        Papa.parse(file, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            if (results.errors.length > 0) {
                setIsError(true)
              setError("Error parsing CSV file. Please check the format.");
            } else if (!validateHeaders(results.meta.fields)) {
                setIsError(true)
              setError(`The file must contain the following columns: ${requiredFields.join(", ")}`);
            } else {
                setIsError(false)
              setData(results.data);
            }
          },
        });
      } else if (file.type.includes("spreadsheet") || file.name.endsWith(".xlsx")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

          const headers = jsonData[0];
          const rows = jsonData.slice(1);

          if (!validateHeaders(headers)) {
            setIsError(true)
            setError(`The file must contain the following columns: ${requiredFields.join(", ")}`);
          } else {
            const formattedData = rows.map((row) => {
              const obj = {};
              headers.forEach((header, index) => {
                obj[header] = row[index];
              });
              return obj;
            });
            setIsError(false)
            setData(formattedData);
          }
        };
        reader.readAsBinaryString(file);
      } else {
        setIsError(true)
        setError("Please upload a valid CSV or Excel file.");
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8080/student/upload", data);
      if (response.status === 200) {
        setSuccessMessage("Data submitted successfully!");
        setData([]);
        setIsError(false)
      }
    } catch (error) {
        setIsError(true)
      setError("Failed to submit data. Please try again.");
    }
  };

  return (
    <div className="file-upload-container">
      <h2>Upload and Submit Student Data</h2>
      <input type="file" accept=".csv,.xlsx" onChange={handleFileUpload} />

      {isError && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {data.length > 0 && (
        <div className="data-section">
          <h3>Uploaded Data</h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  {requiredFields.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {requiredFields.map((field, colIndex) => (
                      <td key={colIndex}>{row[field]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={handleSubmit} className="submit-button">Submit Data</button>
        </div>
      )}
    </div>
  );
};

export default AddStudent;
