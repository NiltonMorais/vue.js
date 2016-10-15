window.billReceiveListComponent = Vue.extend({
    template: `
            <table border="1" cellpadding="10">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Vencimento</th>
                    <th>Nome</th>
                    <th>Valor</th>
                    <th>Recebida?</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(index,o) in bills">
                    <td>{{o.id}}</td>
                    <td>{{o.date_due | dateFormat}}</td>
                    <td>{{o.name | toUpper}}</td>
                    <td>{{o.value | numberFormat}}</td>
                    <td :class="{'green': o.done,'red': !o.done}">{{o.done | doneReceiveLabel}}</td>
                    <td>
                        <button v-link="{name: 'bill-receive.update',params: {id: o.id}}">Editar</button>
                        <button href="#" @click.prevent="deleteBill(o)">Excluir</button>
                    </td>
                </tr>
                </tbody>
            </table>
    `,
    data(){
        return {
            bills: []
        };
    },
    created(){
        BillReceive.query().then((response) => {
            this.bills = response.data;
        });
    },
    methods: {
        deleteBill(bill) {
            if (confirm("Deseja realmente excluir está conta?")) {
                BillReceive.delete({id: bill.id}).then((response) => {
                    this.bills.$remove(bill);
                    this.$dispatch('change-info');
                });
            }
        }
    }
});