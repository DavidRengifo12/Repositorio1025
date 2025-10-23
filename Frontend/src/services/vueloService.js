import supabase from "../Supabase"

// ✅ Lista los vuelos disponibles
export const getFlights = async () => {
  const { data, error } = await supabase
    .from('vuelos')
    .select('*')
    .order('numero_vuelo')

  if (error) throw error
  return data
}

// ✅ Crea un nuevo vuelo
export const postNewFlight = async (newFlight) => {
  const { data, error } = await supabase
    .from('vuelos')
    .insert([newFlight])
    .select()
    .single()

  if (error) throw error
  return data
}

// ✅ Actualiza un vuelo
export const updateFlight = async (id, updates) => {
  const { data, error } = await supabase
    .from('vuelos')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) throw error
  return data
}

// ✅ Elimina un vuelo
export const deleteFlight = async (id) => {
  const { data, error } = await supabase
    .from('vuelos')
    .delete()
    .eq('id', id)

  if (error) throw error
  return data
}

// ✅ Obtiene vuelos por tipo de viaje (ida/vuelta)
export const getFlightsByType = async (type_of_trip) => {
  const { data, error } = await supabase
    .from('vuelos')
    .select('*')
    .eq('tipo_viaje', type_of_trip)
    .order('numero_vuelo')

  if (error) throw error
  return data
}

// ✅ Obtiene vuelos entre fechas (por defecto: hoy → 2 meses)
export const getFlightsByDateRange = async () => {
  const today = new Date()
  const twoMonths = new Date()
  twoMonths.setMonth(today.getMonth() + 2) // ❗ corregido “hoy” → “today”

  const start = today.toLocaleDateString('en-CA')
  const end = twoMonths.toLocaleDateString('en-CA')

  const { data, error } = await supabase
    .from('vuelos')
    .select('*')
    .gte('fecha_salida', start)
    .lte('fecha_salida', end)

  if (error) throw error
  return data
}

// ✅ Filtra vuelos por origen y destino
export const getFlightsFilter = async (origin, destination) => {
  const { data, error } = await supabase
    .from('vuelos')
    .select('*')
    .eq('origen', origin)
    .eq('destino', destination)

  if (error) throw error
  return data
}
