export function serializarDados (dados, camposPermitidos = []) {
    if (dados instanceof Array) {
        const arrayDeObjetosFiltrados = dados.map(item => {
            return extrairCampos(item, camposPermitidos);
        })

        return arrayDeObjetosFiltrados;
    }

    if (dados instanceof Object) {
        return extrairCampos(dados, camposPermitidos)
    }
}

function extrairCampos (objeto, campos) {
    const objetoFiltrado = campos.reduce((acumulador, item) => {
        if (item.min === true) {
            objeto[item.campo] = objeto[item.campo].substring(0, Math.floor(objeto[item.campo].length / 2)) + "..."
        } 
        acumulador[item.campo] = objeto[item.campo];

        return acumulador;
    }, {})
    console.log(objetoFiltrado)

    return objetoFiltrado
}