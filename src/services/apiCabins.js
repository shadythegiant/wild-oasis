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

export async function addCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  // upload image and specify image url in the table
  // therefore we need to generate that path and use uniqe image name

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //

  // ------------------------------------

  let query = supabase.from("cabins");

  // create cabin (IF NO ID)
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // edit cabin if ther is ID

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id); //

  /*  



  .update({ other_column: 'otherValue' })
  .eq('some_column', 'someValue')
  .select()

*/

  const { data, error } = await query.select();

  if (error) {
    console.error(error);
    throw new Error(" cabin couldn't be created ");
  }
  // upload image
  //https://unmmgfkmsibwjiuwpogt.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg

  console.log(newCabin, id);

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // delete cabin if there is storageError

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(" cabin image couldn't be uploaded ");
  }

  return data;
}
