"use strict";

window.billComponent = Vue.extend({
    template: "\n        <nav>\n                <ul>\n                    <li v-for=\"o in menus\">\n                        <a href=\"#\" v-link=\"{name: o.routeName}\">{{o.name}}</a>\n                    </li>\n                </ul>\n        </nav>\n        <router-view></router-view>\n    ",
    data: function data() {
        return {
            menus: [{ name: "Contas a pagar", routeName: 'bill-pay.list' }, { name: "Contas a receber", routeName: 'bill-receive' }]
        };
    }
});