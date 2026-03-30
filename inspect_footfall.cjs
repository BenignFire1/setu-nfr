const XLSX = require('xlsx');
const fs = require('fs');

const filename = '_COMBINED FOOTFALL REPORT OF UTS & PRS (STATION WISE IN-OUT TRAFFIC).xlsx';
try {
    const workbook = XLSX.readFile(filename);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);
    
    console.log('Total Rows:', data.length);
    if (data.length > 0) {
        console.log('Columns:', Object.keys(data[0]));
        console.log('Sample Row:', JSON.stringify(data[0], null, 2));
        
        // Find kamakhya to check data
        const kyq = data.find(r => r['STATION CODE'] === 'KYQ' || r['STATION_CODE'] === 'KYQ');
        if (kyq) {
            console.log('Kamakhya Data:', JSON.stringify(kyq, null, 2));
        }
    }
} catch (err) {
    console.error('Error reading file:', err.message);
}
