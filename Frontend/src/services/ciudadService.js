import supabase from "../Supabase"

// Todos pueden ver ciudades
export const getCiudades = async () => {
  const { data, error } = await supabase
    .from("ciudades")
    .select("*")
    .order("nombre")
  if (error) throw error
  return data
}

// Solo admin: agregar ciudad
export const crearCiudad = async (ciudad) => {
  const { data, error } = await supabase
    .from("ciudades")
    .insert([ciudad])
    .select()
    .single()
  if (error) throw error
  return data
}

// Solo admin: eliminar ciudad
export const eliminarCiudad = async (id) => {
  const { error } = await supabase.from("ciudades").delete().eq("id", id)
  if (error) throw error
}
