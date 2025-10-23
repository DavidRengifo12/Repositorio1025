import supabase from "../Supabase"

// Todos pueden ver las sillas por avión
export const getSillasPorAvion = async (avionId) => {
  const { data, error } = await supabase
    .from("sillas")
    .select("*")
    .eq("avion_id", avionId)
  if (error) throw error
  return data
}

// Admin: crear sillas
export const crearSilla = async (silla) => {
  const { data, error } = await supabase
    .from("sillas")
    .insert([silla])
    .select()
  if (error) throw error
  return data
}
