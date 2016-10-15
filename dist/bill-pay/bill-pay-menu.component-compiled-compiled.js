"use strict";

window.billPayMenuComponent = Vue.extend({
    template: "\n        <nav>\n                <ul>\n                    <li v-for=\"o in menus\">\n                        <a href=\"#\" v-link=\"{name: o.routeName}\">{{o.name}}</a>\n                    </li>\n                </ul>\n        </nav>\n    ",
    data: function data() {
        return {
            menus: [
            //{id: 0, name: "Listar contas", url: '/bills'},
            //{id: 1, name: "Criar conta", url: '/bill/create'},
            { id: 0, name: "Listar contas", routeName: 'bill-pay.list' }, { id: 1, name: "Criar conta", routeName: 'bill-pay.create' }]
        };
    }
});

//# sourceMappingURL=bill-pay-menu.component-compiled.js.map

//# sourceMappingURL=bill-pay-menu.component-compiled-compiled.js.map