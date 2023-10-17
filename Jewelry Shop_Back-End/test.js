import ExcelJS from 'exceljs';
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Sheet1');

// Add data to worksheet
worksheet.addRow(['Name', 'Age']);
worksheet.addRow(['John', 30]);
worksheet.addRow(['Jane', 25]);

// Save workbook to a file
workbook.xlsx.writeFile('output.xlsx');


// import express from 'express';
// import exceljs from 'exceljs';
// const app = express();
// const port = 3000;

// app.get('/download-excel', (req, res) => {
//   // Tạo một workbook mới
//   const workbook = new exceljs.Workbook();
//   const worksheet = workbook.addWorksheet('Sheet1');

//   // Thêm dữ liệu vào worksheet
//   worksheet.addRow(['Name', 'Age']);
//   worksheet.addRow(['John', 30]);
//   worksheet.addRow(['Jane', 25]);

//   // Gửi workbook về client
//   res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//   res.setHeader('Content-Disposition', 'attachment; filename=example.xlsx');

//   workbook.xlsx.write(res)
//     .then(() => {
//       res.end();
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).send('Internal Server Error');
//     });
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
