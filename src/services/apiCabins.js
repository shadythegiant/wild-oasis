import supabase, { supabaseUrl } from "./supaBase";

export default async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("cabins can't be fetched");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("cabins can't be deleted");
  }

  return data;
}

export async function addCabin(newCabin) {
  // upload image and specify image url in the table
  // therefore we need to generate that path and use uniqe image name

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // create cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error(" cabin couldn't be created ");
  }
  // upload image
  //https://unmmgfkmsibwjiuwpogt.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // delete cabin if there is storageError

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
  }

  return data;
}
