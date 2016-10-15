"use strict";

window.billReceiveCreateComponent = Vue.extend({
    template: "\n            <form name=\"form\" @submit.prevent=\"submit\">\n                <label>Vencimento:</label>\n                <input type=\"text\" v-model=\"bill.date_due\">\n                <br><br>\n                <label>Nome:</label>\n                <select v-model=\"bill.name\">\n                    <option v-for=\"o in names\" :value=\"o\">\n                        {{o}}\n                    </option>\n                </select>\n                <br><br>\n                <label>Valor:</label>\n                <input type=\"text\" v-model=\"bill.value | numberFormat\">\n                <br><br>\n                <label>Recebida?</label>\n                <input type=\"checkbox\" v-model=\"bill.done\">\n                <br><br>\n                <input type=\"submit\" value=\"Enviar\" />\n            </form>\n    ",
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
});

//# sourceMappingURL=bill-receive-create.component-compiled.js.map