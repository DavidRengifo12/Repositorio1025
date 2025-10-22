import supabase from "../Supabase"



//obtiene la lista de reservas disponibles

export const getReservations = async () => {
    const {data, error} = await supabase
    .from('reservas')
    .select('*')
    .order('fecha_reserva')

    if(error) throw error
    return data 
}



//crea una nueva reserva 
export const postNewReservation = async(NewReservation) =>{
    const {data, error}  = supabase
    .from('reservas')
    .insert([NewReservation])
    .select()
    .single()


    if(error) throw error
    return data

}

//actualiza una reserva
export const updateReservartion = async (id, updates ) => {
    const {data, error} = await supabase
    .from('reservas')
    .update(updates)
    .eq('id', id)
    .select()

    if(error) throw error
    return data
}

//elimina una reserva
export const deleteReservation = async (id) => {
    const {data, error} = await supabase
    .from('reservas')
    .delete()
    .eq('id', id)

    if(error) throw error
    return data
}
