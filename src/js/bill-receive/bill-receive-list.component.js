let modalComponent = require('../modal.component');
module.exports = {
    components: {
        'modal': modalComponent,
    },
    template: `
    <div class="container">
          <h2>Minhas contas a receber</h2>
            <table class="striped responsive-table centered highline responsive-table z-depth-5">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Vencimento</th>
                    <th>Nome</th>
                    <th>Valor</th>
                    <th>Paga?</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(index,o) in bills">
                    <td>{{o.id}}</td>
                    <td>{{o.date_due | dateFormat 'pt-BR'}}</td>
                    <td>{{o.name | toUpper}}</td>
                    <td>{{o.value | numberFormat}}</td>
                    <td class="white-text" :class="{'green lighten-2': o.done,'red lighten-2': !o.done}">{{o.done | doneReceiveLabel}}</td>
                    <td>
                        <button v-link="{name: 'bill-pay.update',params: {id: o.id}}">Editar</button>
                        <button href="#" @click.prevent="openModalDelete(o)">Excluir</button>
                    </td>
                </tr>
                </tbody>
            </table>
    </div>

    <modal :modal="modal">
        <div slot="content">
            <h4>Mensagem de confirmação</h4>
            <p><strong>Deseja excluir esta conta?</strong></p>
            <div class="divider"></div>
            <p>Nome: <strong>{{billToDelete.name}}</strong></p>
            <p>Valor: <strong>{{billToDelete.value | numberFormat}}</strong></p>
            <p>Data de vencimento: <strong>{{billToDelete.date_due | dateFormat 'pt-BR'}}</strong></p>
            <div class="divider"></div>
        </div>
        <div slot="footer">
            <button class="btn btn-flat waves-effect green lighten-2 modal-close" @click="deleteBill()">Ok</button>
            <button class="btn btn-flat waves-effect waves-red modal-close">Cancelar</button>
        </div>
    </modal>
    `,
    data(){
        return {
            bills: [],
            billToDelete: null,
            modal: {
                id: 'modal-delete'
            }
        };
    },
    created(){
        BillReceive.query().then((response) => {
            this.bills = response.data;
        });
    },
    methods: {
        deleteBill() {
            Bill.delete({id: this.billToDelete.id}).then((response) => {
                this.bills.$remove(this.billToDelete);
                this.billToDelete = null;
                Materialize.toast('Conta excluída com sucesso!', 4000);
                this.$dispatch('change-info');
            });
        },
        openModalDelete(bill){
            this.billToDelete = bill;
            $('#'+this.modal.id).modal('open');
        }
    }
};