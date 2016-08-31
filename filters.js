Vue.filter('doneLabel', function (value) {
    if (value == 0) {
        return "Não paga";
    }
    return "Paga";
});

Vue.filter('statusGeneral', function (value) {
    if (value === false) {
        return "Nenhuma conta cadastrada";
    }
    if (!value) {
        return "Nenhuma conta a pagar";
    }
    return "Existem " + value + " contas a serem pagas";
});
