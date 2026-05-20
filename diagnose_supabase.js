import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://whrujdzqhxwiougxgjfn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_G-FrD7RtzWRH1tFgj6qcyQ_mrzVhATa";

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

async function testInsert() {
  console.log("Testing insert into business_applications...");
  const { data, error } = await supabase.from('business_applications').insert({
    business_name: 'Test Business',
    contact_person: 'Test Person',
    email: 'test@example.com',
    phone: '1234567890',
    business_category: 'Advertisement',
    description: 'Test description',
    worked_with_railways: false,
    railway_experience: null,
    proposal_url: null,
  });

  if (error) {
    console.error("Insert failed:", JSON.stringify(error, null, 2));
  } else {
    console.log("Insert successful:", data);
  }
}

async function testUpload() {
  console.log("Testing upload to proposals bucket...");
  const fakeFileContent = Buffer.from('test pdf content');
  const fileName = `test-${Date.now()}.pdf`;
  const { data, error } = await supabase.storage
    .from("proposals")
    .upload(fileName, fakeFileContent, {
      contentType: 'application/pdf',
    });

  if (error) {
    console.error("Upload failed:", JSON.stringify(error, null, 2));
  } else {
    console.log("Upload successful:", data);
  }
}

async function main() {
  await testUpload();
  await testInsert();
}

main();
