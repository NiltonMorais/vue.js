"use strict";

var names = ["Conta de luz", "Conta de água", "Conta de telefone"];

window.billPayCreateComponent = Vue.extend({
    template: "\n            <form name=\"form\" @submit.prevent=\"submit\">\n                <label>Vencimento:</label>\n                <input type=\"text\" v-model=\"bill.date_due | dateFormat\">\n                <br><br>\n                <label>Nome:</label>\n                <select v-model=\"bill.name\">\n                    <option v-for=\"o in names\" :value=\"o\">\n                        {{o}}\n                    </option>\n                </select>\n                <br><br>\n                <label>Valor:</label>\n                <input type=\"text\" v-model=\"bill.value | numberFormat\">\n                <br><br>\n                <label>Pago?</label>\n                <input type=\"checkbox\" v-model=\"bill.done\">\n                <br><br>\n                <input type=\"submit\" value=\"Enviar\" />\n            </form>\n    ",
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
            return;
        }
    },

    methods: {
        submit: function submit() {
            var _this = this;

            var data = this.bill.toJSON();
            if (this.formType == "insert") {
                Bill.save({}, data).then(function (response) {
                    _this.$dispatch('change-info');
                    _this.$router.go({ name: 'bill-pay.list' });
                });
            } else {
                Bill.update({ id: this.bill.id }, data).then(function (response) {
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
});