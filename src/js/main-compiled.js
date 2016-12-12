'use strict';

var router = new VueRouter();
router.map({
    '/bill-pays': {
        component: billPayComponent,
        subRoutes: {
            '/': {
                name: 'bill-pay.list',
                component: window.billPayListComponent
            },
            '/create': {
                name: 'bill-pay.create',
                component: window.billPayCreateComponent
            },
            '/:id/update': {
                name: 'bill-pay.update',
                component: window.billPayCreateComponent
            }
        }
    },
    '/bill-receives': {
        name: "bill-receive",
        component: billReceiveComponent,
        subRoutes: {
            '/': {
                name: 'bill-receive.list',
                component: window.billReceiveListComponent
            },
            '/create': {
                name: 'bill-receive.create',
                component: window.billReceiveCreateComponent
            },
            '/:id/update': {
                name: 'bill-receive.update',
                component: window.billReceiveCreateComponent
            }
        }
    },
    '/bill-dashboard': {
        name: "bill-dashboard",
        component: billDashboardComponent
    },
    '*': {
        component: window.billDashboardComponent
    }
});

router.start({
    components: {
        'bill-component': billComponent
    }
}, '#app');

router.redirect({
    '*': '/bill-dashboard'
});

//# sourceMappingURL=main-compiled.js.map