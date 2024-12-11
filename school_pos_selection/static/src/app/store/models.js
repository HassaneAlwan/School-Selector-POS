/** @odoo-module */

import { Order } from "@point_of_sale/app/store/models";
import { _t } from "@web/core/l10n/translation";
import { patch } from "@web/core/utils/patch";


patch(Order.prototype, {
    setup() {
        super.setup(...arguments);
        this.school = null;
    },
    // Setter
    set_school(school) {
        this.assert_editable();
        this.school = school;
    },
    // Getter
    get_school() {
        return this.school;
    },
    // Add the school id here to save it in the pos.order record
    export_as_JSON() {
        let json = super.export_as_JSON();
        json.school_id = this.get_school() ? this.get_school().id : false;
        return json;
    },
    // Add the school code for the order ref if school selected
    get_name() {
        const school = this.get_school();
        if (school) {
            return _t("%s %s", this.name, school.code);
        }
        return super.get_name();
    },    
});