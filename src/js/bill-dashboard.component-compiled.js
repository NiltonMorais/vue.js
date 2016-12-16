"use strict";

module.exports = {
    template: "\n    <h1>Dashboard</h1>\n    <h2>Saldo total entre contas a pagar e receber: {{billsPay.total - billsReceive.total | currency \"R$ \"}}</h2>\n    <h3>Total contas a pagar: {{billsPay.total | currency \"R$ \"}}</h3>\n    <h3>Total contas a receber: {{billsReceive.total | currency \"R$ \"}}</h3>\n    ",
    data: function data() {
        return {
            billsPay: { total: 0 },
            billsReceive: { total: 0 }
        };
    },
    created: function created() {
        this.updateTotal();
    },
    methods: {
        updateTotal: function updateTotal() {
            var self = this;
            Bill.total().then(function (response) {
                self.billsPay.total = response.data.total;
            });
            BillReceive.total().then(function (response) {
                self.billsReceive.total = response.data.total;
            });
        }
    }
};

//# sourceMappingURL=bill-dashboard.component-compiled.js.map