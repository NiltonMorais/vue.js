"use strict";

module.exports = {
    template: "\n<div class=\"container\">\n        <div class=\"row\">\n            <h2>Nova conta</h2>\n            <form name=\"form\" @submit.prevent=\"submit\">\n                <div class=\"row\">\n                    <div class=\"input-field col s6\">\n                        <label class=\"active\">Vencimento</label>\n                        <input type=\"text\" v-model=\"bill.date_due | dateFormat\" placeholder=\"Informe a data\">\n                    </div>\n                    <div class=\"input-field col s6\">\n                        <label class=\"active\">Valor</label>\n                        <input type=\"text\" v-model=\"bill.value | numberFormat\">\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"input-field col s6\">\n                            <label class=\"active\">Nome</label>\n                            <select v-model=\"bill.name\" id=\"name\" class=\"browser-default\">\n                                <option value=\"\" disabled selected>Escolha um nome</option>\n                                <option v-for=\"o in names\" :value=\"o\">\n                                    {{o}}\n                                </option>\n                            </select>\n                    </div>\n                    <div class=\"input-field col s6\">\n                        <input type=\"checkbox\" v-model=\"bill.done\" id=\"pago\">\n                        <label for=\"pago\">Recebida?</label>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"input-field col s12\">\n                        <input type=\"submit\" value=\"Enviar\" class=\"btn btn-large right\"/>\n                    </div>\n                </div>\n            </form>\n        </div>\n    </div>\n    ",
    data: function data() {
        return {
            formType: "insert",
            names: ["Conta de luz", "Conta de água", "Conta de telefone"],
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: false
            }
        };
    },
    created: function created() {
        if (this.$route.name == 'bill-receive.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
            return;
        }
    },

    methods: {
        submit: function submit() {
            var _this = this;

            if (this.formType == "insert") {
                BillReceive.save({}, this.bill).then(function (response) {
                    _this.$dispatch('change-info');
                    _this.$router.go({ name: 'bill-receive.list' });
                });
            } else {
                BillReceive.update({ id: this.bill.id }, this.bill).then(function (response) {
                    _this.$dispatch('change-info');
                    _this.$router.go({ name: 'bill-receive.list' });
                });
            }
        },
        getBill: function getBill(id) {
            var _this2 = this;

            BillReceive.get({ id: id }).then(function (response) {
                _this2.bill = response.data;
            });
        }
    }
};

//# sourceMappingURL=bill-receive-create.component-compiled.js.map