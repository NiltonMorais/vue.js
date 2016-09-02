window.billReceiveComponent = Vue.extend({
    components: {
        'menu-component': billReceiveMenuComponent
    },
    template: `
        <style type="text/css">
            .red{
                color: red;
            }
            .green{
                color: green;
            }
            .gray{
                color: gray;
            }
        </style>
        <h1>{{title}}</h1>
        <h3 :class="{'gray': status === false,'green': status === 0,'red': status > 0}">{{status | statusReceive}}</h3>
        <h3>Total: {{total | currency 'R$ '}}</h3>
        <menu-component></menu-component>
        <router-view></router-view>
        </div>
    `,
    data: function() {
        return {
            title: "Contas a receber",
            status: false,
            total: 0
        };
    },
    created: function(){
        this.updateStatus();
        this.updateTotal();
    },
    methods: {
        calculateStatus: function(bills){
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
        updateStatus: function(){
            var self = this;
            BillReceive.query().then(function(response){
                self.calculateStatus(response.data);
            });
        },
        updateTotal: function(){
            var self = this;
            BillReceive.total().then(function(response){
                self.total = response.data.total;
            });
        }
    },
    events: {
        'change-info': function(){
            this.updateStatus();
            this.updateTotal();
        }
    }
});
