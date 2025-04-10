import supabase from "./supaBase";

export default async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("cabins can't be fetched");
  }

  return data;
}
