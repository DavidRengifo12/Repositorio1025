import supabase from "../Supabase"


//Lista los vuelos dispoibles
export const getFligth = async () => {
    const {data, error} = await supabase
    .from('vuelos')
    .select('*')
    .order('numero_vuelo')

    if(error) throw error
    return data 
}



//crea un nuevo vuelo
export const postNewFlight  = async(newFlight) =>{
    const {data, error}  = supabase
    .from('vuelos')
    .insert([newFlight])
    .select()
    .single()


    if(error) throw error
    return data


}

//actualiza un vuelo 
export const updateFlight = async (id, updates ) => {
    const {data, error} = await supabase
    .from('vuelos')
    .update(updates)
    .eq('id', id)
    .select()

    if(error) throw error
    return data
}


//elimina un vuelo
export const deleteFlight = async (id) => {
    const {data, error} = await supabase
    .from('vuelos')
    .delete()
    .eq('id', id)

    if(error) throw error
    return data
}

// obtiene los vuelos por tipo de vuelo
export const getFlightsByType  = async(type_of_trip) => {
    const {data,error} = await supabase
    .from('vuelos')
    .select('*')
    .eq('tipo_viaje', type_of_trip)
    .order('numero_vuelo');

  if (error) throw error;
  return data;
}

//obtiene los vuelos por fecha
export const getFlightsByDateRange = async () => {
  const today = new Date()
  const twoMonths = new Date()
  twoMonths.setMonth(hoy.getMonth() + 2)

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

//filtra cuidades de destino y origen 
export const getFlightsFilter = async (origin, destination) => {
  const { data, error } = await supabase
    .from('vuelos')
    .select('*')
    .eq('origen', origin)
    .eq('destino', destination)
  if (error) throw error
  return data
}