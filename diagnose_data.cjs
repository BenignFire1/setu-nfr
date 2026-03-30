const XLSX = require('xlsx');
const fs = require('fs');

const workbook = XLSX.readFile('PAMS_Report (1).xls');
const pams = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
const raw = JSON.parse(fs.readFileSync('./src/data/station_categories_2023_24.json', 'utf8'));

const pamsMap = new Map();
pams.forEach(p => pamsMap.set(p['Station Code'], p));

const discrepancies = [];
raw.forEach(s => {
    const p = pamsMap.get(s.code);
    if (p) {
        if (s.present_category !== p.Category) {
            discrepancies.push({
                code: s.code,
                name: s.station,
                old: s.present_category,
                new: p.Category,
                proposed: s.proposed_category,
                nsg: s.nsg_group
            });
        }
    }
});

console.log('Total Discrepancies:', discrepancies.length);
console.log('Top 20 Discrepancies:', JSON.stringify(discrepancies.slice(0, 20), null, 2));

const kyq = discrepancies.find(d => d.code === 'KYQ');
if (kyq) {
    console.log('Kamakhya Jn (KYQ) Discrepancy:', JSON.stringify(kyq, null, 2));
} else {
    // If not in discrepancies, check current value
    const sKyq = raw.find(s => s.code === 'KYQ');
    console.log('Kamakhya Jn (KYQ) Current:', JSON.stringify(sKyq, null, 2));
}
