var router = new VueRouter();

var mainComponent = Vue.extend({
    components: {
        'bill-component': window.billComponent
    },
    template: '<bill-component></bill-component>',
    data: function(){
        return {
            billsPay: [
                {date_due: '20/08/2016', name: 'Conta de luz', value: 25.99, done: true},
                {date_due: '21/08/2016', name: 'Conta de água', value: 33.42, done: false},
                {date_due: '22/08/2016', name: 'Conta de telefone', value: 71.21, done: false},
            ]
        }
    }
});

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
            '/:index/update': {
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
        'main-component':mainComponent
    }
},'#app');

router.redirect({
    '*': '/bill-pays'
});