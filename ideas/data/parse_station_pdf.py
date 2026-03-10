"""
Parse: New Category of Station 2023-24 PDF
Title: Category-wise number of railway stations over NFR opened for passenger traffic
       based on the annual passenger earnings and outward passengers handled during 2023-24

Columns:
  Sr. No. | Station | Zone | Code | Division | State | Present Category 2023-24
  | Passengers (Reserved | Unreserved | Total) 
  | Earnings (Reserved | Unreserved | Total) 
  | Proposed Category

Output: CSV + JSON in ideas/data/
"""

import sys
import json
import csv
import re
import os

# ── dependency check ──────────────────────────────────────────────────────────
try:
    import pdfplumber
except ImportError:
    print("[INFO] pdfplumber not found. Installing...")
    os.system(f"{sys.executable} -m pip install pdfplumber")
    import pdfplumber

# ── paths ─────────────────────────────────────────────────────────────────────
SCRIPT_DIR   = os.path.dirname(os.path.abspath(__file__))
PDF_PATH     = os.path.join(SCRIPT_DIR, "New Category of Station 2023-24 (1).pdf")
OUT_CSV      = os.path.join(SCRIPT_DIR, "station_categories_2023_24.csv")
OUT_JSON     = os.path.join(SCRIPT_DIR, "station_categories_2023_24.json")

# ── helpers ───────────────────────────────────────────────────────────────────
NSG_HEADER_RE = re.compile(r"^NSG\s*[-–]?\s*\d+$", re.IGNORECASE)

FIELDNAMES = [
    "sr_no",
    "station",
    "zone",
    "code",
    "division",
    "state",
    "present_category",
    "nsg_group",            # which NSG block this row belongs to
    "passengers_reserved",
    "passengers_unreserved",
    "passengers_total",
    "earnings_reserved",
    "earnings_unreserved",
    "earnings_total",
    "proposed_category",
]


def clean(val):
    """Strip and normalise whitespace from a cell value."""
    if val is None:
        return ""
    return " ".join(str(val).split())


def is_number(s):
    return bool(re.match(r"^[\d,]+(\.\d+)?$", s.strip()))


def parse_number(s):
    """Return int/float from a comma-formatted number string, or None."""
    s = clean(s).replace(",", "")
    if not s:
        return None
    try:
        return int(s) if "." not in s else float(s)
    except ValueError:
        return None


# ── main extraction ───────────────────────────────────────────────────────────
def extract_rows(pdf_path):
    records = []
    current_nsg = "UNKNOWN"

    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages, start=1):
            print(f"  Processing page {page_num}/{len(pdf.pages)} …")

            # Extract with generous table settings to capture merged cells
            tables = page.extract_tables({
                "vertical_strategy":   "lines",
                "horizontal_strategy": "lines",
                "snap_tolerance":      5,
                "join_tolerance":      5,
            })

            for table in tables:
                for row in table:
                    cells = [clean(c) for c in row]

                    # Skip fully empty rows
                    if all(c == "" for c in cells):
                        continue

                    # Detect NSG group header rows like "NSG - 1", "NSG-2" …
                    joined = " ".join(cells)
                    nsg_match = re.search(r"NSG\s*[-–]?\s*(\d+)", joined, re.IGNORECASE)
                    if nsg_match and sum(1 for c in cells if c) <= 4:
                        current_nsg = f"NSG-{nsg_match.group(1)}"
                        print(f"    → Group: {current_nsg}")
                        continue

                    # Skip header rows (contain "Station" or "Reserved" as text label)
                    if any(kw in joined for kw in ["Station", "Sr.", "Reserved", "Unreserved"]):
                        continue

                    # We need at least 10 non-empty cells to be a data row
                    non_empty = [c for c in cells if c]
                    if len(non_empty) < 6:
                        continue

                    # Try to find sr_no (first numeric cell)
                    # Typical layout: [sr, station, zone, code, division, state, present_cat, p_res, p_unres, p_total, e_res, e_unres, e_total, prop_cat]
                    # Flatten all cells into a list
                    flat = [c for c in cells]

                    # Find index of serial number (leading integer)
                    sr_idx = None
                    for i, c in enumerate(flat):
                        if re.match(r"^\d+$", c):
                            sr_idx = i
                            break

                    if sr_idx is None:
                        continue

                    try:
                        rec_cells = flat[sr_idx:]

                        # Pull out the known positional fields
                        # Positions may vary; use heuristics:
                        # 0:sr, 1:station, 2:zone, 3:code, 4:division, 5:state, 6:present_cat
                        # then 3 passenger columns, 3 earning cols, 1 proposed_cat

                        # Find the three earning/passenger groups by scanning for numeric clusters
                        text_part = rec_cells[:7]  # sr + 6 text fields
                        num_part  = [c for c in rec_cells[7:] if c != ""]

                        if len(text_part) < 7:
                            continue

                        sr            = text_part[0]
                        station       = text_part[1]
                        zone          = text_part[2]
                        code          = text_part[3]
                        division      = text_part[4]
                        state         = text_part[5]
                        present_cat   = text_part[6]

                        # num_part should be: p_res, p_unres, p_total, e_res, e_unres, e_total, prop_cat
                        if len(num_part) < 7:
                            continue

                        p_res    = parse_number(num_part[0])
                        p_unres  = parse_number(num_part[1])
                        p_total  = parse_number(num_part[2])
                        e_res    = parse_number(num_part[3])
                        e_unres  = parse_number(num_part[4])
                        e_total  = parse_number(num_part[5])
                        prop_cat = clean(num_part[6])

                        records.append({
                            "sr_no":                  sr,
                            "station":                station,
                            "zone":                   zone,
                            "code":                   code,
                            "division":               division,
                            "state":                  state,
                            "present_category":       present_cat,
                            "nsg_group":              current_nsg,
                            "passengers_reserved":    p_res,
                            "passengers_unreserved":  p_unres,
                            "passengers_total":       p_total,
                            "earnings_reserved":      e_res,
                            "earnings_unreserved":    e_unres,
                            "earnings_total":         e_total,
                            "proposed_category":      prop_cat,
                        })

                    except Exception as e:
                        # Skip malformed rows silently
                        continue

    return records


# ── write outputs ─────────────────────────────────────────────────────────────
def write_csv(records, path):
    with open(path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=FIELDNAMES)
        writer.writeheader()
        writer.writerows(records)
    print(f"\n✅  CSV saved  → {path}  ({len(records)} rows)")


def write_json(records, path):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(records, f, indent=2, ensure_ascii=False)
    print(f"✅  JSON saved → {path}  ({len(records)} rows)")


# ── entry point ───────────────────────────────────────────────────────────────
if __name__ == "__main__":
    if not os.path.exists(PDF_PATH):
        print(f"❌  PDF not found at: {PDF_PATH}")
        sys.exit(1)

    print(f"📄  Parsing: {PDF_PATH}\n")
    rows = extract_rows(PDF_PATH)

    if not rows:
        print("⚠️  No data rows extracted. Check the PDF table structure.")
        sys.exit(1)

    print(f"\n📊  Total rows extracted: {len(rows)}")

    # Preview first 3 rows
    print("\n── Preview (first 3 rows) ──────────────────────────────────────────────")
    for r in rows[:3]:
        print(json.dumps(r, indent=2, ensure_ascii=False))

    write_csv(rows, OUT_CSV)
    write_json(rows, OUT_JSON)
