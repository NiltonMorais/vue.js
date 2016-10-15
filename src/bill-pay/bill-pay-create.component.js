const names = ["Conta de luz", "Conta de água", "Conta de telefone"];

window.billPayCreateComponent = Vue.extend({
    template: `
            <form name="form" @submit.prevent="submit">
                <label>Vencimento:</label>
                <input type="text" v-model="bill.date_due | dateFormat">
                <br><br>
                <label>Nome:</label>
                <select v-model="bill.name">
                    <option v-for="o in names" :value="o">
                        {{o}}
                    </option>
                </select>
                <br><br>
                <label>Valor:</label>
                <input type="text" v-model="bill.value | numberFormat">
                <br><br>
                <label>Pago?</label>
                <input type="checkbox" v-model="bill.done">
                <br><br>
                <input type="submit" value="Enviar" />
            </form>
    `,
    data(){
        return {
            formType: "insert",
            names: names,
            bill: new BillPay()
        }
    },
    created(){
        if(this.$route.name == 'bill-pay.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.id);
            return;
        }
    },
    methods: {
        submit() {
            var data = this.bill.toJSON();
            if (this.formType == "insert") {
                Bill.save({},data).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-pay.list'});
                });
            }else{
                Bill.update({id: this.bill.id},data).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-pay.list'});
                });
            }
        },
        getBill(id){
            Bill.get({id: id}).then((response) => {
                this.bill = new BillPay(response.data);
            });
        },
        getDateDue(date_due){
            let dateDueObject = date_due;
            if(!(date_due instanceof Date)){
                dateDueObject = new Date(date_due.split('/').reverse().join('-')+"T03:00:00");
            }
            return dateDueObject.toISOString().split('T')[0];
        }
    }
});
