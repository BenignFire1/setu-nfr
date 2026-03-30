const XLSX = require('xlsx');
const filename = '_COMBINED FOOTFALL REPORT OF UTS & PRS (STATION WISE IN-OUT TRAFFIC).xlsx';

try {
    const workbook = XLSX.readFile(filename);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Read as array of arrays
    
    // Print first 10 rows to see the header
    console.log('--- FIRST 10 ROWS ---');
    data.slice(0, 10).forEach((row, i) => {
        console.log(`Row ${i}:`, JSON.stringify(row));
    });
} catch (err) {
    console.error('Error:', err.message);
}
