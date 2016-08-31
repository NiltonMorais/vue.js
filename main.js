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
        component: billReceiveComponent
    },
    '*': {
        component: window.billPayListComponent
    }
});

router.start({
    components: {
        'bill-component': billComponent
    }
},'#app');

router.redirect({
    '*': '/bill-pays'
});