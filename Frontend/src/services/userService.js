import supabase from "../Supabase"

// Obtener perfil del usuario autenticado
export const getPerfilUsuario = async () => {
  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("id", (await supabase.auth.getUser()).data.user.id)
    .single()

  if (error) throw error
  return data
}

// Actualizar perfil del usuario autenticado
export const updatePerfilUsuario = async (updates) => {
  const user = (await supabase.auth.getUser()).data.user
  const { data, error } = await supabase
    .from("usuarios")
    .update(updates)
    .eq("id", user.id)
    .select()
    .single()

  if (error) throw error
  return data
}

// Solo admin: listar todos los usuarios
export const getTodosUsuarios = async () => {
  const { data, error } = await supabase.from("usuarios").select("*")
  if (error) throw error
  return data
}
