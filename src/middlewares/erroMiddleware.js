module.exports = (err, req, res, next) => {
    // erro conhecido
    if (err.statusCode) {
        return res.status(err.statusCode).json({
            erro: err.mensagem
        });
    }

    // erro estranho
    console.error("Erro inesperado: " + err);

    return res.status(500).json({
        erro: "Erro interno do servidor"
    });
};