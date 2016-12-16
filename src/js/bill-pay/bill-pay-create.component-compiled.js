"use strict";

var names = ["Conta de luz", "Conta de água", "Conta de telefone"];

var BillPay = require('../bill');

module.exports = {
    template: "\n    <div class=\"container\">\n        <div class=\"row\">\n            <h2>Nova conta</h2>\n            <form name=\"form\" @submit.prevent=\"submit\">\n                <div class=\"row\">\n                    <div class=\"input-field col s6\">\n                        <label class=\"active\">Vencimento</label>\n                        <input type=\"text\" v-model=\"bill.date_due | dateFormat\" placeholder=\"Informe a data\">\n                    </div>\n                    <div class=\"input-field col s6\">\n                        <label class=\"active\">Valor</label>\n                        <input type=\"text\" v-model=\"bill.value | numberFormat\">\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"input-field col s6\">\n                            <label class=\"active\">Nome</label>\n                            <select v-model=\"bill.name\" id=\"name\" class=\"browser-default\">\n                                <option value=\"\" disabled selected>Escolha um nome</option>\n                                <option v-for=\"o in names\" :value=\"o\">\n                                    {{o}}\n                                </option>\n                            </select>\n                    </div>\n                    <div class=\"input-field col s6\">\n                        <input type=\"checkbox\" v-model=\"bill.done\" id=\"pago\">\n                        <label for=\"pago\">Pago?</label>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"input-field col s12\">\n                        <input type=\"submit\" value=\"Enviar\" class=\"btn btn-large right\"/>\n                    </div>\n                </div>\n            </form>\n        </div>\n    </div>\n    ",
    data: function data() {
        return {
            formType: "insert",
            names: names,
            bill: new BillPay()
        };
    },
    created: function created() {
        if (this.$route.name == 'bill-pay.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    ready: function ready() {
        $('#name').material_select();
    },

    methods: {
        submit: function submit() {
            var _this = this;

            var data = this.bill.toJSON();
            if (this.formType == "insert") {
                Bill.save({}, data).then(function (response) {
                    Materialize.toast('Conta criada com sucesso!', 4000);
                    _this.$dispatch('change-info');
                    _this.$router.go({ name: 'bill-pay.list' });
                });
            } else {
                Bill.update({ id: this.bill.id }, data).then(function (response) {
                    Materialize.toast('Conta atualizada com sucesso!', 4000);
                    _this.$dispatch('change-info');
                    _this.$router.go({ name: 'bill-pay.list' });
                });
            }
        },
        getBill: function getBill(id) {
            var _this2 = this;

            Bill.get({ id: id }).then(function (response) {
                _this2.bill = new BillPay(response.data);
            });
        },
        getDateDue: function getDateDue(date_due) {
            var dateDueObject = date_due;
            if (!(date_due instanceof Date)) {
                dateDueObject = new Date(date_due.split('/').reverse().join('-') + "T03:00:00");
            }
            return dateDueObject.toISOString().split('T')[0];
        }
    }
};

//# sourceMappingURL=bill-pay-create.component-compiled.js.map