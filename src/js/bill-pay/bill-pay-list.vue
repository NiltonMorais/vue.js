<template>
    <div class="container">
          <h2>Minhas contas a pagar</h2>
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
                    <td class="white-text" :class="{'green lighten-2': o.done,'red lighten-2': !o.done}">{{o.done | doneLabel}}</td>
                    <td>
                        <button v-link="{name: 'bill-pay.update',params: {id: o.id}}">Editar</button>
                        <button href="#" @click.prevent="openModalDelete(o)">Excluir</button>
                    </td>
                </tr>
                </tbody>
            </table>
    </div>

    <modal :modal="modal">
        <div slot="content" v-if="billToDelete">
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
</template>

<script type="text/javascript">
import {BillResource} from '../resource';
import modalComponent from '../modal.vue';

export default {
    components: {
        'modal': modalComponent,
    },
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
        BillResource.query().then((response) => {
            this.bills = response.data;
        });
    },
    methods: {
        deleteBill() {
            BillResource.delete({id: this.billToDelete.id}).then((response) => {
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
</script>
