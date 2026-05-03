import { createClient } from "@supabase/supabase-js";

const annonkey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0anhmZ3F0a3ZwdXZnZ3JibGN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4MTgxNjksImV4cCI6MjA5MzM5NDE2OX0.9nXpV4LYQ1SSiFEqKEd6PcCwUk5ewWtGhZ0eE5Ze9pk";
const supabaseurl = "https://vtjxfgqtkvpuvggrblcv.supabase.co";

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
