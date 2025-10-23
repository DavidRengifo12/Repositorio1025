import supabase from "../Supabase"

// Pasajero crea una compra
export const crearCompra = async (compra) => {
  const { data, error } = await supabase
    .from("compras")
    .insert([compra])
    .select()
    .single()
  if (error) throw error
  return data
}

// Pasajero ve sus compras
export const getComprasUsuario = async (userId) => {
  const { data, error } = await supabase
    .from("compras")
    .select("*")
    .eq("usuario_pagador_id", userId)
    .order("fecha_compra", { ascending: false })
  if (error) throw error
  return data
}

// Admin ve todas las compras
export const getTodasLasCompras = async () => {
  const { data, error } = await supabase.from("compras").select("*")
  if (error) throw error
  return data
}
