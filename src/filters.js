Vue.filter('doneLabel', (value) => value == 0 ? "Não paga" : "Paga");

Vue.filter('doneReceiveLabel', (value) => value == 0 ? "Não recebida" : "Recebida");

Vue.filter('statusPay', (value) => {
    if (value === false) {
        return "Nenhuma conta cadastrada";
    }
    if (!value) {
        return "Nenhuma conta a pagar";
    }
    return value + " contas a pagar";
});

Vue.filter('statusReceive', function (value) {
    if (value === false) {
        return "Nenhuma conta cadastrada";
    }
    if (!value) {
        return "Nenhuma conta a receber";
    }
    return value + " contas a receber";
});

Vue.filter('numberFormat', {
    read(value,locale = "pt-BR"){
        let number = 0;
        if(value && typeof value !== undefined){
            let numberRegex = value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/g);
            number = numberRegex ? numberRegex[0] : 0;
        }
        return new Intl.NumberFormat(locale,{
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
        }).format(number);
    },
    write(value){
        let number = 0;
        if(value.length > 0){
            number = value.replace(/[^\d\,]/g, '')
                .replace(/\,/g,'.');
            number = isNaN(number) ? 0 : parseFloat(number);
        }
        return number;
    }
});

Vue.filter('dateFormat', {
    read(value, locale = 'pt-BR'){
        if(value && typeof value !== undefined){
            if(!(value instanceof Date)){
                var dateRegex = value.match(/\d{4}\-\d{2}\-\d{2}/g);
                var dateString = dateRegex ? dateRegex[0] : null;
                if(dateString){
                    value = new Date(dateString+"T03:00:00");
                }else{
                    return value;
                }
            }
            return new Intl.DateTimeFormat(locale).format(value).split(' ')[0];
        }
        return value;
    },
    write(value){
        var dateRegex = value.match(/\d{2}\/\d{2}\/\d{4}/g);
        if(dateRegex){
            let  dateString = dateRegex[0];
            let  date = new Date(dateString.split('/').reverse().join('-')+"T03:00:00");
            if(!isNaN(date.getTime())){
                return date;
            }
        }
        return value;
    }
});

Vue.filter('toUpper',{
    read(value){
        return value.toUpperCase();
    },
    write(value){
        return value.toUpperCase();
    }
});