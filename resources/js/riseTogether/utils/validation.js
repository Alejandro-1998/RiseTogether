export const contienePalabrasInapropiadas = (mensaje) => {
    if (!mensaje) return false;
    const palabrasProhibidas = [
        "mierda",
        "puto",
        "puta",
        "cabron",
        "cabrón",
        "gilipollas",
        "coño",
        "joder",
        "maricon",
        "maricón",
        "basura",
        "estafa",
        "pendejo",
        "pendeja",
        "hijodeputa",
        "hijo de puta"
    ];
    const msg = mensaje.toLowerCase();
    return palabrasProhibidas.some(palabra => msg.includes(palabra));
};
