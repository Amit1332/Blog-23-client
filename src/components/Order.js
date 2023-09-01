import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Order = () => {
  const generatePdf = () => {
    // Create a new PDF document
    const doc = new jsPDF();

    // Define your HTML content as a DOM element
    const content = document.getElementById('pdf-content');

    // Convert the HTML content to an image using html2canvas
    html2canvas(content).then((canvas) => {
      // Add the image to the PDF with reduced image quality
      const imgData = canvas.toDataURL('image/jpeg', 0.7); // Adjust the quality (0.7 is 70% quality)
      doc.addImage(imgData, 'JPEG', 0, 0);

      // Generate a Blob containing the PDF data
      const blob = doc.output('blob');

      // Create a URL for the Blob
      const blobUrl = URL.createObjectURL(blob);

      // Open the Blob URL in a new tab for viewing
      window.open(blobUrl, '_blank');

      // Save the PDF to a file
      doc.save('order-details.pdf');
    });
  };

  return (
    <div>
      <button onClick={generatePdf}>Generate PDF</button>
      <div id="pdf-content" style={{ width: '210mm', height: '297mm', padding: '10mm' }}>
        <h1>Order Details</h1>
        <p>Order Date: September 1, 2023</p>
        <p>Customer: John Doe</p>
        <p>Items:</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
    </div>
  );
};

export default Order;
