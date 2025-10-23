import supabase from "../Supabase"

// Admin crea avión
export const crearAvion = async (avion) => {
  const { data, error } = await supabase
    .from("avion")
    .insert([avion])
    .select()
    .single()
  if (error) throw error
  return data
}

// Admin obtiene todos los aviones
export const getAviones = async () => {
  const { data, error } = await supabase.from("avion").select("*")
  if (error) throw error
  return data
}

// Admin actualiza avión
export const updateAvion = async (id, updates) => {
  const { data, error } = await supabase
    .from("avion")
    .update(updates)
    .eq("id", id)
    .select()
  if (error) throw error
  return data
}
