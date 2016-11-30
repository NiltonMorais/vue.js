"use strict";

window.billReceiveListComponent = Vue.extend({
    template: "\n            <table border=\"1\" cellpadding=\"10\">\n                <thead>\n                <tr>\n                    <th>#</th>\n                    <th>Vencimento</th>\n                    <th>Nome</th>\n                    <th>Valor</th>\n                    <th>Recebida?</th>\n                    <th>A\xE7\xF5es</th>\n                </tr>\n                </thead>\n                <tbody>\n                <tr v-for=\"(index,o) in bills\">\n                    <td>{{o.id}}</td>\n                    <td>{{o.date_due | dateFormat}}</td>\n                    <td>{{o.name | toUpper}}</td>\n                    <td>{{o.value | numberFormat}}</td>\n                    <td :class=\"{'green': o.done,'red': !o.done}\">{{o.done | doneReceiveLabel}}</td>\n                    <td>\n                        <button v-link=\"{name: 'bill-receive.update',params: {id: o.id}}\">Editar</button>\n                        <button href=\"#\" @click.prevent=\"deleteBill(o)\">Excluir</button>\n                    </td>\n                </tr>\n                </tbody>\n            </table>\n    ",
    data: function data() {
        return {
            bills: []
        };
    },
    created: function created() {
        var _this = this;

        BillReceive.query().then(function (response) {
            _this.bills = response.data;
        });
    },

    methods: {
        deleteBill: function deleteBill(bill) {
            var _this2 = this;

            if (confirm("Deseja realmente excluir está conta?")) {
                BillReceive.delete({ id: bill.id }).then(function (response) {
                    _this2.bills.$remove(bill);
                    _this2.$dispatch('change-info');
                });
            }
        }
    }
});