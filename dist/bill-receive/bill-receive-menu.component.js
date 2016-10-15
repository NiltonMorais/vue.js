"use strict";

window.billReceiveMenuComponent = Vue.extend({
    template: "\n        <nav>\n                <ul>\n                    <li v-for=\"o in menus\">\n                        <a href=\"#\" v-link=\"{name: o.routeName}\">{{o.name}}</a>\n                    </li>\n                </ul>\n        </nav>\n    ",
    data: function data() {
        return {
            menus: [{ id: 0, name: "Listar contas", routeName: 'bill-receive.list' }, { id: 1, name: "Criar conta", routeName: 'bill-receive.create' }]
        };
    }
});