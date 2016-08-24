Vue.filter('doneLabel',function(value){
    if(value == 0){
        return "Não paga";
    }
    return "Paga";
});

var app = new Vue({
    el: "#app",
    data: {
        title: "Contas a pagar",
        menus: [
            {id: 0,name: "Listar contas"},
            {id: 1,name: "Criar conta"},
        ],
        activedView: 0,
        formType: "insert",
        bill: {
            date_due: '',
            name: '',
            value: 0,
            done: 0
        },
        names: ["Conta de luz","Conta de água","Conta de telefone"],
        bills: [
            {date_due: '20/08/2016',name: 'Conta de luz',value: 25.99,done: 1},
            {date_due: '21/08/2016',name: 'Conta de água',value: 33.42,done: 0},
            {date_due: '22/08/2016',name: 'Conta de telefone',value: 71.21,done: 0},
        ],
        status_class: "",
    },
    computed: {
        status: function(){
            var count = 0, status_text = "";

            if(this.bills.length > 0) {
                for (var i in this.bills) {
                    if (!this.bills[i].done) {
                        count++;
                    }
                }

                if (!count) {
                    status_text = "Nenhuma conta a pagar";
                    this.status_class = "pago";
                } else {
                    status_text = "Existem " + count + " a serem pagas";
                    this.status_class = "nao-pago";
                }
                return status_text;
            }

            status_text = "Nenhuma conta cadastrada";
            this.status_class = "nao-existe";

            return status_text;
        }
    },
    methods: {
        showView: function(id){
            this.activedView = id;
            if(id == 1){
                this.formType = "insert";
            }
        },
        delete: function(id){
            if(confirm("Deseja realmente excluir está conta?")){
                this.bills.splice(id,1);
            }
        },
        down: function(id){
            this.bills[id].done = 1;
        },
        up: function(id){
            this.bills[id].done = 0;
        },
        submit: function(){
            if(this.formType == "insert"){
                this.bills.push(this.bill);
            }

            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: 0
            };

            this.activedView = 0;
        },
        loadBill: function(bill){
            this.bill = bill;
            this.activedView = 1;
            this.formType = "update";
        }

    }
});

Vue.filter('doneLabel',function(value){
    if(value == 0){
        return "Não paga";
    }
    return "Paga";
});