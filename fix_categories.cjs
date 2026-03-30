const fs = require('fs');
const XLSX = require('xlsx');

// 1. Load Datasets
const raw = JSON.parse(fs.readFileSync('./src/data/station_categories_2023_24.json', 'utf8'));
const workbook = XLSX.readFile('PAMS_Report (1).xls');
const pamsRaw = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

// 2. Load Footfall Report
const footfallWorkbook = XLSX.readFile('_COMBINED FOOTFALL REPORT OF UTS & PRS (STATION WISE IN-OUT TRAFFIC).xlsx');
const footfallRaw = XLSX.utils.sheet_to_json(footfallWorkbook.Sheets[footfallWorkbook.SheetNames[0]], { range: 7 });

// 3. Map PAMS and Footfall data for fast access
const pamsMap = new Map();
pamsRaw.forEach(p => pamsMap.set(p['Station Code'], p));

const footfallMap = new Map();
footfallRaw.forEach(f => footfallMap.set(f['STN CODE'], f));

// 4. Category Normalization Helper
function normalizeCategory(cat) {
    if (!cat) return '';
    let val = cat.toString().trim().toUpperCase();
    if (val.startsWith('NSG') && !val.includes('-')) {
        val = val.replace('NSG', 'NSG-');
    } else if (val.startsWith('HG') && !val.includes('-')) {
        val = val.replace('HG', 'HG-');
    }
    val = val.replace(/\s+/g, '');
    return val;
}

// 5. Merge Logic
const merged = raw.map(s => {
    const p = pamsMap.get(s.code);
    const f = footfallMap.get(s.code);
    
    // 1. Prioritize PAMS Category
    const updatedCategory = p && p.Category ? normalizeCategory(p.Category) : normalizeCategory(s.present_category);
    
    // 2. NEW Footfall Report Earnings field
    const passengerEarningsFootfall = f ? parseFloat(f['TTL EARNING']) || 0 : 0;

    const result = {
        ...s,
        present_category: updatedCategory,
        passenger_earnings_footfall: passengerEarningsFootfall,
        // Existing s.earnings_total and s.passengers_total are preserved
    };

    if (p) {
        result.facilities = {
            electrified: p['ELECTRIFIED'] === 'Y',
            food_plaza: p['Food Plaza'] === 'Y',
            cloak_room: p['Cloak Room'] === 'Y',
            atm_nos: parseInt(p['ATM(Nos)']) || 0,
            station_clock: p['Station Clock'] === 'Y',
            booking_windows: parseInt(p['Booking Windows(Nos.)']) || 0,
            enquiry_counters: parseInt(p['Enquiry Counters(Nos.)']) || 0,
            pas: p['Public Address System'] === 'Y',
            adarsh: p['Identified as Adarsh Station'] === 'Y',
            mfc: p['Identified for MFC'] === 'Y',
            tourist_center: p['Tourist Facilation Center'] === 'Y',
            train_board: p['Elec Train Indication Board'] === 'Y',
            touch_screen: p['Touch Screen Enquiry System'] === 'Y',
            passengers_day: parseInt(p['Passengers dealt with(Nos)/Day']) || 0,
            waiting_hall_area: parseFloat(p['Waiting Hall Area(Sqm)']) || 0,
            retiring_rooms: parseInt(p['Retiring Room(Nos)']) || 0,
            dormitory_beds: parseInt(p['Dormitory Bed(Nos)']) || 0,
            refreshment_room: parseFloat(p['Refreshment Room Area(Sqm)']) || 0,
            fobs: parseInt(p['No of FOBs']) || 0,
            subways: parseInt(p['No of Subways']) || 0,
            second_entry: p['Station IInd Entry'] === 'Y',
            parking_area_sqm: parseFloat(p['Area of Circulating Area(sqm)']) || 0,
            parking_earmarked: p['Earmarked Parking Area'] === 'Y',
            disability_wheelchair: p['Wheel Chair for Disab'] === 'Y',
            disability_stretcher: p['Stretchers for Disab'] === 'Y',
            disability_ramp: p['Ramp for Disab'] === 'Y',
            disability_parking: p['Parking for Disab'] === 'Y',
            disability_toilet: p['Toilet for Disab'] === 'Y',
            disability_lifts_escalators: p['Escalators/lifts for Disab'] === 'Y',
            platform_shelter: parseFloat(p['Platform Shelter']) || 0,
            platform_taps: parseInt(p['Platform Taps/Hand Pumps(nos)']) || 0,
            platform_lavatories: parseInt(p['Platform Lavatories(nos)']) || 0,
            platform_urinals: parseInt(p['Platform Urinals(nos)']) || 0,
            platform_seats: parseInt(p['Platform Seats(nos)']) || 0,
            platforms_count: parseInt(p['No of Platforms']) || 0,
        };
    }
    return result;
});

// 5. Save Output
fs.writeFileSync('./src/data/merged_stations.json', JSON.stringify(merged, null, 2));

// 6. Verification log for Kamakhya (KYQ)
const kyq = merged.find(m => m.code === 'KYQ');
console.log('--- VERIFICATION ---');
console.log('Kamakhya Jn (KYQ) Final Category:', kyq ? kyq.present_category : 'NOT FOUND');
console.log('Total stations processed:', merged.length);
console.log('Data saved to src/data/merged_stations.json');
