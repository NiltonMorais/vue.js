"use strict";

Vue.filter('doneLabel', function (value) {
    if (value == 0) {
        return "Não paga";
    }
    return "Paga";
});

Vue.filter('doneReceiveLabel', function (value) {
    if (value == 0) {
        return "Não recebida";
    }
    return "Recebida";
});

Vue.filter('statusPay', function (value) {
    if (value === false) {
        return "Nenhuma conta cadastrada";
    }
    if (!value) {
        return "Nenhuma conta a pagar";
    }
    return "Existem " + value + " contas a serem pagas";
});

Vue.filter('statusReceive', function (value) {
    if (value === false) {
        return "Nenhuma conta cadastrada";
    }
    if (!value) {
        return "Nenhuma conta a receber";
    }
    return "Existem " + value + " contas a serem recebidas";
});

//# sourceMappingURL=filters-compiled.js.map

//# sourceMappingURL=filters-compiled-compiled.js.map