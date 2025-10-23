// services/compraService.js
import supabase from "../Supabase"

// Servicio que obtiene el precio real del vuelo asociado a una reserva
export const obtenerPrecioPorReserva = async (reservaId) => {
  const { data: reserva, error: errRes } = await supabase
    .from("reservas")
    .select("vuelo_id")
    .eq("id", reservaId)
    .single()
  if (errRes) throw errRes

  const { data: vuelo, error: errVuelo } = await supabase
    .from("vuelos")
    .select("precio_vuelo")
    .eq("id", reserva.vuelo_id)
    .single()
  if (errVuelo) throw errVuelo

  return vuelo.precio_vuelo
}

//Crea una compra ya vinculada al usuario y reserva
export const crearCompra = async ({ reservaId, metodo_pago }) => {
  try {
    const { data: user } = await supabase.auth.getUser()
    const usuario_pagador_id = user?.user?.id
    if (!usuario_pagador_id) throw new Error("Usuario no autenticado")

    const precio = await obtenerPrecioPorReserva(reservaId)

    const codigo_compra = Math.random().toString(36).substring(2, 10).toUpperCase()

    const { data, error } = await supabase
      .from("compras")
      .insert([
        {
          codigo_compra,
          usuario_pagador_id,
          total: precio,
          metodo_pago,
          estado_pago: "Pendiente",
        },
      ])
      .select()
      .single()
    if (error) throw error

    await supabase.from("reservas").update({ compra_id: data.id }).eq("id", reservaId)

    return data
  } catch (err) {
    console.error(" Error creando compra:", err)
    throw err
  }
}
