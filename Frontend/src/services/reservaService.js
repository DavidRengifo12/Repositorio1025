import supabase from "../Supabase"

// ✅ Obtiene todas las reservas
export const getReservations = async () => {
  const { data, error } = await supabase
    .from('reservas')
    .select('*')
    .order('fecha_reserva')

  if (error) throw error
  return data
}

// ✅ Crea una nueva reserva
export const postNewReservation = async (newReservation) => {
  const { data, error } = await supabase
    .from('reservas')
    .insert([newReservation])
    .select()
    .single()

  if (error) throw error
  return data
}

// ✅ Actualiza una reserva
export const updateReservation = async (id, updates) => {
  const { data, error } = await supabase
    .from('reservas')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) throw error
  return data
}

// ✅ Elimina una reserva
export const deleteReservation = async (id) => {
  const { data, error } = await supabase
    .from('reservas')
    .delete()
    .eq('id', id)

  if (error) throw error
  return data
}
