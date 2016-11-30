"use strict";

var _typeof3 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof2 = typeof Symbol === "function" && _typeof3(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof3(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof3(obj);
};

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

Vue.filter('doneLabel', function (value) {
    return value == 0 ? "Não paga" : "Paga";
});

Vue.filter('doneReceiveLabel', function (value) {
    return value == 0 ? "Não recebida" : "Recebida";
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

Vue.filter('numberFormat', {
    read: function read(value) {
        var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "pt-BR";

        var number = 0;
        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) !== undefined) {
            var numberRegex = value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/g);
            number = numberRegex ? numberRegex[0] : 0;
        }
        return new Intl.NumberFormat(locale, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
        }).format(number);
    },
    write: function write(value) {
        var number = 0;
        if (value.length > 0) {
            number = value.replace(/[^\d\,]/g, '').replace(/\,/g, '.');
            number = isNaN(number) ? 0 : parseFloat(number);
        }
        return number;
    }
});

Vue.filter('dateFormat', {
    read: function read(value) {
        var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'pt-BR';

        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) !== undefined) {
            if (!(value instanceof Date)) {
                var dateRegex = value.match(/\d{4}\-\d{2}\-\d{2}/g);
                var dateString = dateRegex ? dateRegex[0] : null;
                if (dateString) {
                    value = new Date(dateString + "T03:00:00");
                } else {
                    return value;
                }
            }
            return new Intl.DateTimeFormat(locale).format(value).split(' ')[0];
        }
        return value;
    },
    write: function write(value) {
        var dateRegex = value.match(/\d{2}\/\d{2}\/\d{4}/g);
        if (dateRegex) {
            var dateString = dateRegex[0];
            var date = new Date(dateString.split('/').reverse().join('-') + "T03:00:00");
            if (!isNaN(date.getTime())) {
                return date;
            }
        }
        return value;
    }
});

Vue.filter('toUpper', {
    read: function read(value) {
        return value.toUpperCase();
    },
    write: function write(value) {
        return value.toUpperCase();
    }
});

//# sourceMappingURL=filters-compiled.js.map

//# sourceMappingURL=filters-compiled-compiled.js.map