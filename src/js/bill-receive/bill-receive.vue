<template>
    <div class="section">
            <div class="container">
                <h4>{{title}}</h4>
                <div class=row>
                    <div class="col s7">
                        <div class="card z-depth-2" :class="{'gray': status === false,'green': status === 0,'red': status > 0}">
                            <div class="card-content white-text">
                                <p class="card-title">
                                    <i class="material-icons">account_balance</i>
                                </p>
                                <h5>
                                    {{status | statusReceive}}
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div class="col s5">
                        <div class="card z-depth-2">
                            <div class="card-content">
                                <p class="card-title">
                                    <i class="material-icons">payment</i>
                                </p>
                                <h5>
                                  Total: {{total | numberFormat}}
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    <div class="divider"></div>
    <router-view></router-view>
</template>

<script type="text/javascript">
import {BillReceiveResource} from '../resource';
let billReceiveMenuComponent = require('./bill-receive-menu.component');

export default {
    components: {
        'menu-component': billReceiveMenuComponent
    },
    data() {
        return {
            title: "Contas a receber",
            status: false,
            total: 0
        };
    },
    created(){
        this.updateStatus();
        this.updateTotal();
    },
    methods: {
        calculateStatus(bills){
            if (!bills.length) {
                this.status = false;
            }
            var count = 0;

            for (var i in bills) {
                if (!bills[i].done) {
                    count++;
                }
            }
            this.status = count;
        },
        updateStatus(){
            BillReceiveResource.query().then((response) => {
                this.calculateStatus(response.data);
            });
        },
        updateTotal(){
            BillReceiveResource.total().then((response) => {
                this.total = response.data.total;
            });
        }
    },
    events: {
        'change-info'(){
            this.updateStatus();
            this.updateTotal();
        }
    }
};
</script>

