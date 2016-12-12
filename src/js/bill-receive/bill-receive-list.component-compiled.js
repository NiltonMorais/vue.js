'use strict';

window.billReceiveListComponent = Vue.extend({
    components: {
        'modal': window.modalComponent
    },
    template: '\n    <div class="container">\n          <h2>Minhas contas a receber</h2>\n            <table class="striped responsive-table centered highline responsive-table z-depth-5">\n                <thead>\n                <tr>\n                    <th>#</th>\n                    <th>Vencimento</th>\n                    <th>Nome</th>\n                    <th>Valor</th>\n                    <th>Paga?</th>\n                    <th>A\xE7\xF5es</th>\n                </tr>\n                </thead>\n                <tbody>\n                <tr v-for="(index,o) in bills">\n                    <td>{{o.id}}</td>\n                    <td>{{o.date_due | dateFormat \'pt-BR\'}}</td>\n                    <td>{{o.name | toUpper}}</td>\n                    <td>{{o.value | numberFormat}}</td>\n                    <td class="white-text" :class="{\'green lighten-2\': o.done,\'red lighten-2\': !o.done}">{{o.done | doneReceiveLabel}}</td>\n                    <td>\n                        <button v-link="{name: \'bill-pay.update\',params: {id: o.id}}">Editar</button>\n                        <button href="#" @click.prevent="openModalDelete(o)">Excluir</button>\n                    </td>\n                </tr>\n                </tbody>\n            </table>\n    </div>\n\n    <modal :modal="modal">\n        <div slot="content">\n            <h4>Mensagem de confirma\xE7\xE3o</h4>\n            <p><strong>Deseja excluir esta conta?</strong></p>\n            <div class="divider"></div>\n            <p>Nome: <strong>{{billToDelete.name}}</strong></p>\n            <p>Valor: <strong>{{billToDelete.value | numberFormat}}</strong></p>\n            <p>Data de vencimento: <strong>{{billToDelete.date_due | dateFormat \'pt-BR\'}}</strong></p>\n            <div class="divider"></div>\n        </div>\n        <div slot="footer">\n            <button class="btn btn-flat waves-effect green lighten-2 modal-close" @click="deleteBill()">Ok</button>\n            <button class="btn btn-flat waves-effect waves-red modal-close">Cancelar</button>\n        </div>\n    </modal>\n    ',
    data: function data() {
        return {
            bills: [],
            billToDelete: null,
            modal: {
                id: 'modal-delete'
            }
        };
    },
    created: function created() {
        var _this = this;

        BillReceive.query().then(function (response) {
            _this.bills = response.data;
        });
    },

    methods: {
        deleteBill: function deleteBill() {
            var _this2 = this;

            Bill.delete({ id: this.billToDelete.id }).then(function (response) {
                _this2.bills.$remove(_this2.billToDelete);
                _this2.billToDelete = null;
                Materialize.toast('Conta excluída com sucesso!', 4000);
                _this2.$dispatch('change-info');
            });
        },
        openModalDelete: function openModalDelete(bill) {
            this.billToDelete = bill;
            $('#' + this.modal.id).modal('open');
        }
    }
});

//# sourceMappingURL=bill-receive-list.component-compiled.js.map