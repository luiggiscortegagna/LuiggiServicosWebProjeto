module.exports = (err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message || "Erro interno do servidor";

    if (status === 500) {
        console.error(err);
    }

    return res.status(status).json({
        erro: message
    });
};