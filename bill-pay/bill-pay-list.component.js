window.billPayListComponent = Vue.extend({
    template: `
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
                    <td>{{o.date_due}}</td>
                    <td>{{o.name}}</td>
                    <td>{{o.value | currency "R$ " 2}}</td>
                    <td :class="{'green': o.done,'red': !o.done}">{{o.done | doneLabel}}</td>
                    <td>
                        <button v-link="{name: 'bill-pay.update',params: {id: o.id}}">Editar</button>
                        <button href="#" @click.prevent="deleteBill(o)">Excluir</button>
                    </td>
                </tr>
                </tbody>
            </table>
    `,
    data: function(){
        return {
            bills: []
        };
    },
    created: function(){
        var self = this;
        Bill.query().then(function(response){
            self.bills = response.data;
        });
    },
    methods: {
        deleteBill: function (bill) {
            if (confirm("Deseja realmente excluir está conta?")) {
                var self = this;
                Bill.delete({id: bill.id}).then(function(response){
                    self.bills.$remove(bill);
                    self.$dispatch('change-info');
                });
            }
        }
    }
});