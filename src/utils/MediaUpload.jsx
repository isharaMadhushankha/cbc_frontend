import { createClient } from "@supabase/supabase-js";

const annonkey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndueHh2aWJrdm5ncHFvbWpxd2N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2MzY4ODUsImV4cCI6MjA4MTIxMjg4NX0.r3dQ8lyeO9sCEt2yzo1Lar2th3wIW3R4bZ1kw0DcfWk";
const supabaseurl = "https://wnxxvibkvngpqomjqwct.supabase.co";

const supabase = createClient(supabaseurl, annonkey);

const MediaUpload = (file) => {
  return new Promise((resolve, reject) => {
    if (file == null) {
      reject("No file selected");
    } else {
        const timestamp = new Date().getTime();
        const filename = timestamp + file.name
      supabase.storage
        .from("images")
        .upload(filename, file, {
          upsert: false,
          cacheControl: "3600",
        })
        .then(() => {
          const publiculr = supabase.storage
            .from("images")
            .getPublicUrl(filename).data.publicUrl;
          console.log(publiculr);
          resolve(publiculr)
        }).catch(
            ()=>{
                reject("An error occured")
            }
        )
    }
  });
};

export default MediaUpload;
