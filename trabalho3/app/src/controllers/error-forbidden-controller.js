

function forbiddenError(req, res)  {
    const modulo = "";
    res.render('error-forbidden', {modulo:modulo});
};

function forbiddenErrorFinanceiro(req, res)  {
    const modulo = 'FINANCEIRO';
    res.render('error-forbidden', {modulo:modulo});
}

function forbiddenErrorProdutos(req, res)  {
    const modulo = 'PRODUTOS';
    res.render('error-forbidden', {modulo:modulo});
}

function forbiddenErrorRelatorios(req, res)  {
    const modulo = 'RELATORIOS';
    res.render('error-forbidden', {modulo:modulo});
}

export {
    forbiddenError,
    forbiddenErrorFinanceiro,
    forbiddenErrorProdutos,
    forbiddenErrorRelatorios
}