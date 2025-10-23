import supabase from "../Supabase"

// Pasajero asigna una silla a su reserva
export const asignarSillaAReserva = async (asignacion) => {
  const { data, error } = await supabase
    .from("asignacion_sillas")
    .insert([asignacion])
    .select()
    .single()
  if (error) throw error
  return data
}

// Pasajero ve sus asignaciones
export const getAsignacionesUsuario = async (userId) => {
  const { data, error } = await supabase
    .from("asignacion_sillas")
    .select("*, reservas(codigo_reserva, vuelo_id)")
    .eq("reservas.usuario_id", userId)
  if (error) throw error
  return data
}

// Admin ve todas las asignaciones
export const getTodasAsignaciones = async () => {
  const { data, error } = await supabase.from("asignacion_sillas").select("*")
  if (error) throw error
  return data
}
