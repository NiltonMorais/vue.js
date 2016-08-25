Vue.filter('doneLabel', function (value) {
    if (value == 0) {
        return "Não paga";
    }
    return "Paga";
});

Vue.filter('statusGeneral', function (value) {
    if (value === false) {
        return "Nenhuma conta cadastrada";
    }
    if (!value) {
        return "Nenhuma conta a pagar";
    }
    return "Existem " + value + " contas a serem pagas";
});

var appComponent = Vue.extend({
    template: `
        <h1>{{title}}</h1>
        <h3 :class="{'gray': status === false,'green': status === 0,'red': status > 0}">{{status | statusGeneral}}</h3>
        <nav>
            <ul>
                <li v-for="o in menus">
                    <a href="#" @click.prevent="showView(o.id)">{{o.name}}</a>
                </li>
            </ul>
        </nav>
        <div v-if="activedView == 0">
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
                        <button href="#" @click.prevent="loadBill(o)">Editar</button>
                        <button href="#" @click.prevent="down(index)">Pagar</button>
                        <button href="#" @click.prevent="up(index)">Não paga</button>
                        <button href="#" @click.prevent="deleteBill(o)">Excluir</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div v-if="activedView == 1">
            <form name="form" @submit.prevent="submit">
                <label>Vencimento:</label>
                <input type="text" v-model="bill.date_due">
                <br><br>
                <label>Nome:</label>
                <select v-model="bill.name">
                    <option v-for="o in names" :value="o">
                        {{o}}
                    </option>
                </select>
                <br><br>
                <label>Valor:</label>
                <input type="text" v-model="bill.value">
                <br><br>
                <label>Pago?</label>
                <input type="checkbox" v-model="bill.done">
                <br><br>
                <input type="submit" value="Enviar" />
            </form>
        </div>
    `,
    data: function() {
        return {
            title: "Contas a pagar",
            menus: [
                {id: 0, name: "Listar contas"},
                {id: 1, name: "Criar conta"},
            ],
            activedView: 0,
            formType: "insert",
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: false
            },
            names: ["Conta de luz", "Conta de água", "Conta de telefone"],
            bills: [
                {date_due: '20/08/2016', name: 'Conta de luz', value: 25.99, done: true},
                {date_due: '21/08/2016', name: 'Conta de água', value: 33.42, done: false},
                {date_due: '22/08/2016', name: 'Conta de telefone', value: 71.21, done: false},
            ]
        };
    },
    computed: {
        status: function () {
            if (!this.bills.length) {
                return false;
            }
            var count = 0;

            for (var i in this.bills) {
                if (!this.bills[i].done) {
                    count++;
                }
            }
            return count;
        }
    },
    methods: {
        showView: function (id) {
            this.activedView = id;
            if (id == 1) {
                this.formType = "insert";
            }
        },
        down: function (id) {
            this.bills[id].done = true;
        },
        up: function (id) {
            this.bills[id].done = false;
        },
        submit: function () {
            if (this.formType == "insert") {
                this.bills.push(this.bill);
            }

            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: false
            };

            this.activedView = 0;
        },
        loadBill: function (bill) {
            this.bill = bill;
            this.activedView = 1;
            this.formType = "update";
        },
        deleteBill: function (bill) {
            if (confirm("Deseja realmente excluir está conta?")) {
                this.bills.$remove(bill);
            }
        }

    }
});

Vue.component('app-component',appComponent);

var app = new Vue({
    el: "#app",
});