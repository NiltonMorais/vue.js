'use strict';

module.exports = {
    template: '\n        <div :id="modal.id" class="modal">\n            <div class="modal-content">\n                <slot name="content"></slot>\n            </div>\n            <div class="modal-footer">\n                <slot name="footer"></slot>\n            </div>\n        </div>\n    ',
    props: {
        modal: {
            type: Object,
            default: function _default() {
                return {
                    id: ''
                };
            }
        }
    },
    data: function data() {
        return {
            modal: {
                id: ''
            }
        };
    },
    ready: function ready() {
        var id = this.modal.id;
        $(document).ready(function () {
            $('#' + id).modal();
        });
    }
};

//# sourceMappingURL=modal.component-compiled.js.map