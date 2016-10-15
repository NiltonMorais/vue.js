"use strict";

window.billPayListComponent = Vue.extend({
    template: "\n            <table border=\"1\" cellpadding=\"10\">\n                <thead>\n                <tr>\n                    <th>#</th>\n                    <th>Vencimento</th>\n                    <th>Nome</th>\n                    <th>Valor</th>\n                    <th>Paga?</th>\n                    <th>A\xE7\xF5es</th>\n                </tr>\n                </thead>\n                <tbody>\n                <tr v-for=\"(index,o) in bills\">\n                    <td>{{o.id}}</td>\n                    <td>{{o.date_due}}</td>\n                    <td>{{o.name}}</td>\n                    <td>{{o.value | currency \"R$ \" 2}}</td>\n                    <td :class=\"{'green': o.done,'red': !o.done}\">{{o.done | doneLabel}}</td>\n                    <td>\n                        <button v-link=\"{name: 'bill-pay.update',params: {id: o.id}}\">Editar</button>\n                        <button href=\"#\" @click.prevent=\"deleteBill(o)\">Excluir</button>\n                    </td>\n                </tr>\n                </tbody>\n            </table>\n    ",
    data: function data() {
        return {
            bills: []
        };
    },
    created: function created() {
        var self = this;
        Bill.query().then(function (response) {
            self.bills = response.data;
        });
    },
    methods: {
        deleteBill: function deleteBill(bill) {
            if (confirm("Deseja realmente excluir está conta?")) {
                var self = this;
                Bill.delete({ id: bill.id }).then(function (response) {
                    self.bills.$remove(bill);
                    self.$dispatch('change-info');
                });
            }
        }
    }
});

//# sourceMappingURL=bill-pay-list.component-compiled.js.map

//# sourceMappingURL=bill-pay-list.component-compiled-compiled.js.map