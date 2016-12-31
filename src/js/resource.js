Vue.http.options.root = "http://localhost:8000/api";

let BillResource = Vue.resource('bills{/id}',{},{
    total: {method: 'GET', url: 'bills/total'}
});

let BillReceiveResource = Vue.resource('bills-receive{/id}',{},{
    total: {method: 'GET', url: 'bills-receive/total'}
});

export {BillResource, BillReceiveResource};