<template>
    <h1>Dashboard</h1>
    <h2>Saldo total entre contas a pagar e receber: {{billsPay.total - billsReceive.total | currency "R$ "}}</h2>
    <h3>Total contas a pagar: {{billsPay.total | currency "R$ "}}</h3>
    <h3>Total contas a receber: {{billsReceive.total | currency "R$ "}}</h3>
</template>

<script type="text/javascript">
import {BillResource,BillReceiveResource} from './resource';
export default {
    data: function(){
        return {
            billsPay: {total: 0},
            billsReceive: {total: 0}
        }
    },
    created: function(){
        this.updateTotal();
    },
    methods: {
        updateTotal: function(){
            var self = this;
            BillResource.total().then(function(response){
                self.billsPay.total = response.data.total;
            });
            BillReceiveResource.total().then(function(response){
                self.billsReceive.total = response.data.total;
            });
        }
    },
};
</script>
