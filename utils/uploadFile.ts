import { createClient } from "@supabase/supabase-js";

// Create Supabase client
const supabase = createClient(
  "https://qrxfodpyxhchwlkojpkv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyeGZvZHB5eGhjaHdsa29qcGt2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NTc2MzcxMSwiZXhwIjoyMDAxMzM5NzExfQ.kMqrDeVWzbW5smSMtNt1s2yu2uGGMdF0KFyRQJc4jPo"
);

// Upload file using standard upload
async function uploadFile(filename: string, file: any) {
  const { data, error } = await supabase.storage
    .from("avatar")
    .upload(filename, file);
  if (error) {
    // Handle error
    console.log(error);
    throw new Error("Error uploading file");
  } else {
    // Handle success
    return data.path;
  }
}

export { uploadFile };
