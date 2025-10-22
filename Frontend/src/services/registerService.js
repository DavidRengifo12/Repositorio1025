import supabase from "../Supabase";

export async function registerUser({
  email,
  password,
  nombres,
  primerApellido,
  segundoApellido,
  genero,
  fechaNacimiento,
  tipoDocumento,
  documento,
  telefono,
}) {
  try {
    // 1️⃣ Registro en Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { rol: "pasajeros" },
      },
    });

    if (error) throw error;

    const userId = data.user?.id;
    if (!userId) throw new Error("No se obtuvo el ID del usuario.");

    // 2️⃣ Insertar en tabla pasajeros
    const { error: insertError } = await supabase.from("pasajeros").insert([
      {
        primer_apellido: primerApellido,
        segundo_apellido: segundoApellido,
        nombres,
        fecha_nacimiento: fechaNacimiento,
        genero,
        documento,
        tipo_documento: tipoDocumento,
        telefono,
        email,
        password,
        usuario_id: userId,
      },
    ]);

    if (insertError) throw insertError;

    return { success: true };
  } catch (error) {
    console.error("❌ Error en el registro:", error.message);
    return { success: false, error: error.message };
  }
}
