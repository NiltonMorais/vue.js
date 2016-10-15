'use strict';

window.billReceiveComponent = Vue.extend({
    components: {
        'menu-component': billReceiveMenuComponent
    },
    template: '\n        <style type="text/css">\n            .red{\n                color: red;\n            }\n            .green{\n                color: green;\n            }\n            .gray{\n                color: gray;\n            }\n        </style>\n        <h1>{{title}}</h1>\n        <h3 :class="{\'gray\': status === false,\'green\': status === 0,\'red\': status > 0}">{{status | statusReceive}}</h3>\n        <h3>Total: {{total | numberFormat}}</h3>\n        <menu-component></menu-component>\n        <router-view></router-view>\n        </div>\n    ',
    data: function data() {
        return {
            title: "Contas a receber",
            status: false,
            total: 0
        };
    },
    created: function created() {
        this.updateStatus();
        this.updateTotal();
    },

    methods: {
        calculateStatus: function calculateStatus(bills) {
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
        updateStatus: function updateStatus() {
            var _this = this;

            BillReceive.query().then(function (response) {
                _this.calculateStatus(response.data);
            });
        },
        updateTotal: function updateTotal() {
            var _this2 = this;

            BillReceive.total().then(function (response) {
                _this2.total = response.data.total;
            });
        }
    },
    events: {
        'change-info': function changeInfo() {
            this.updateStatus();
            this.updateTotal();
        }
    }
});

//# sourceMappingURL=bill-receive.component-compiled.js.map