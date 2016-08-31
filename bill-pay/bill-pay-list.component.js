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
                    <td>{{index + 1}}</td>
                    <td>{{o.date_due}}</td>
                    <td>{{o.name}}</td>
                    <td>{{o.value | currency "R$ " 2}}</td>
                    <td :class="{'green': o.done,'red': !o.done}">{{o.done | doneLabel}}</td>
                    <td>
                        <button v-link="{name: 'bill-pay.update',params: {index: index}}">Editar</button>
                        <button href="#" @click.prevent="down(index)">Pagar</button>
                        <button href="#" @click.prevent="up(index)">Não paga</button>
                        <button href="#" @click.prevent="deleteBill(o)">Excluir</button>
                    </td>
                </tr>
                </tbody>
            </table>
    `,
    data: function(){
        return {
            bills: this.$root.$children[0].billsPay
        };
    },
    methods: {
        deleteBill: function (bill) {
            if (confirm("Deseja realmente excluir está conta?")) {
                this.$root.$children[0].billsPay.$remove(bill);
            }
        },
        down: function (id) {
            this.bills[id].done = true;
        },
        up: function (id) {
            this.bills[id].done = false;
        },
    },
});