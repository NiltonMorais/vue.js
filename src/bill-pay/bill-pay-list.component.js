window.billPayListComponent = Vue.extend({
    template: `
    <div class="container">
            <table border="1" cellpadding="10">
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
                    <td :class="{'green': o.done,'red': !o.done}">{{o.done | doneLabel}}</td>
                    <td>
                        <button v-link="{name: 'bill-pay.update',params: {id: o.id}}">Editar</button>
                        <button href="#" @click.prevent="deleteBill(o)">Excluir</button>
                    </td>
                </tr>
                </tbody>
            </table>
    </div>
    `,
    data(){
        return {
            bills: []
        };
    },
    created(){
        Bill.query().then((response) => {
            this.bills = response.data;
        });
    },
    methods: {
        deleteBill(bill) {
            if (confirm("Deseja realmente excluir está conta?")) {
                Bill.delete({id: bill.id}).then((response) => {
                    this.bills.$remove(bill);
                    this.$dispatch('change-info');
                });
            }
        }
    }
});