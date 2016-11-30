'use strict';

window.billComponent = Vue.extend({
    template: '\n        <div class="navbar-fixed">\n            <nav>\n                <div class="nav-wrapper">\n                    <div class="row">\n                        <div class="col s12">\n                            <a href="#" class="brand-logo">Code Contas</a>\n                            <a href="#" data-activates="nav-mobile" class="button-collapse">\n                                <i class="material-icons">menu</i>\n                            </a>\n                            <ul class="right hide-on-med-and-down">\n                                <li v-for="o in menus">\n                                    <a href="#" v-link="{name: o.routeName}">{{o.name}}</a>\n                                </li>\n                            </ul>\n                            <ul id="nav-mobile" class="side-nav">\n                                <li v-for="o in menus">\n                                    <a href="#" v-link="{name: o.routeName}">{{o.name}}</a>\n                                </li>\n                            </ul>\n                        </div>\n                    </div>\n                </div>\n            </nav>\n        </div>\n        <router-view></router-view>\n    ',
    created: function created() {
        $(document).ready(function () {
            $('.button-collapse').sideNav();
        });
    },
    data: function data() {
        return {
            menus: [{ name: "Contas a pagar", routeName: 'bill-pay.list' }, { name: "Contas a receber", routeName: 'bill-receive' }]
        };
    }
});