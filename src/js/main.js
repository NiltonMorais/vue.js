require('./bootstrap');
require([
    './bill.component',
    './bill-dashboard.component',
    './bill-pay/bill-pay.component',
    './bill-pay/bill-pay-list.component',
    './bill-pay/bill-pay-create.component',
    './bill-receive/bill-receive.component',
    './bill-receive/bill-receive-list.component',
    './bill-receive/bill-receive-create.component'
    ],
    function(
        billComponent,
        billDashboardComponent,
        billPayComponent,
        billPayListComponent,
        billPayCreateComponent,
        billReceiveComponent,
        billReceiveListComponent,
        billReceiveCreateComponent
    ){
    let VueRouter = require('vue-router');
    let router = new VueRouter();
    router.map({
        '/bill-pays': {
            component: billPayComponent,
            subRoutes: {
                '/': {
                    name: 'bill-pay.list',
                    component: billPayListComponent
                },
                '/create': {
                    name: 'bill-pay.create',
                    component: billPayCreateComponent
                },
                '/:id/update': {
                    name: 'bill-pay.update',
                    component: billPayCreateComponent
                }
            }
        },
        '/bill-receives': {
            name: "bill-receive",
            component: billReceiveComponent,
            subRoutes: {
                '/': {
                    name: 'bill-receive.list',
                    component: billReceiveListComponent
                },
                '/create': {
                    name: 'bill-receive.create',
                    component: billReceiveCreateComponent
                },
                '/:id/update': {
                    name: 'bill-receive.update',
                    component: billReceiveCreateComponent
                }
            }
        },
        '/bill-dashboard': {
            name: "bill-dashboard",
            component: billDashboardComponent
        },
        '*': {
            component: billDashboardComponent
        }
    });

    router.start({
        components: {
            'bill-component': billComponent,
        }
    },'#app');

    router.redirect({
        '*': '/bill-dashboard'
    });
});