window.billReceiveCreateComponent = Vue.extend({
    template: `
<div class="container">
        <div class="row">
            <h2>Nova conta</h2>
            <form name="form" @submit.prevent="submit">
                <div class="row">
                    <div class="input-field col s6">
                        <label class="active">Vencimento</label>
                        <input type="text" v-model="bill.date_due | dateFormat" placeholder="Informe a data">
                    </div>
                    <div class="input-field col s6">
                        <label class="active">Valor</label>
                        <input type="text" v-model="bill.value | numberFormat">
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6">
                            <label class="active">Nome</label>
                            <select v-model="bill.name" id="name" class="browser-default">
                                <option value="" disabled selected>Escolha um nome</option>
                                <option v-for="o in names" :value="o">
                                    {{o}}
                                </option>
                            </select>
                    </div>
                    <div class="input-field col s6">
                        <input type="checkbox" v-model="bill.done" id="pago">
                        <label for="pago">Recebida?</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="submit" value="Enviar" class="btn btn-large right"/>
                    </div>
                </div>
            </form>
        </div>
    </div>
    `,
    data(){
        return {
            formType: "insert",
            names: ["Conta de luz", "Conta de água", "Conta de telefone"],
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: false
            }
        }
    },
    created(){
        if(this.$route.name == 'bill-receive.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.id);
            return;
        }
    },
    methods: {
        submit() {
            if (this.formType == "insert") {
                BillReceive.save({},this.bill).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-receive.list'});
                });
            }else{
                BillReceive.update({id: this.bill.id},this.bill).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-receive.list'});
                });
            }
        },
        getBill(id){
            BillReceive.get({id: id}).then((response) => {
                this.bill = response.data;
            });
        }
    }
});
