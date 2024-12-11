/** @odoo-module **/

import { _t } from "@web/core/l10n/translation";
import { registry } from "@web/core/registry";
import { useService, useAutofocus } from "@web/core/utils/hooks";
import { usePos } from "@point_of_sale/app/store/pos_hook";
import { Component, onWillUnmount, useRef, useState, onMounted } from "@odoo/owl";
import { SchoolLine } from "../school_line/school_line";

export class SchoolsListScreen extends Component {
    static components = { SchoolLine };

    static template = "school_pos_selection.SchoolListScreen";

    setup() {
        this.pos = usePos();
        this.ui = useState(useService("ui"));
        this.orm = useService("orm");
        this.notification = useService("pos_notification");
        this.searchWordInputRef = useRef("search-word-input-school");
        useAutofocus({refName: 'search-word-input-school'});
        this.state = useState({
            query: null,
            schoolList: [],
            selectedSchool: this.props.school,
        });
        onMounted(this.fetchSchools);
    }
    
    async fetchSchools() {
        try {
            const res = await this.orm.call('res.school', 'get_schools_list', []);
            this.state.schoolList = res;
        } catch (error) {
            console.error("Error fetching schools:", error);
        }
    }

    back(force = false) {
        if (this.state.detailIsShown && !force) {
            this.state.detailIsShown = false;
        } else {
            this.props.resolve({ confirmed: false, payload: false });
            this.pos.closeTempScreen();
        }
    }

    confirm() {
        this.props.resolve({ confirmed: true, payload: this.state.selectedSchool });
        this.pos.closeTempScreen();
    }
    // Getters

    get currentOrder() {
        return this.pos.get_order();
    }

    get schools() {
        return this.state.schoolList;
    }

    // Methods


    clickSchool(school) {
        if (this.state.selectedSchool && this.state.selectedSchool.id === school.id) {
            this.state.selectedSchool = null;
        } else {
            this.state.selectedSchool = school;
        }
        this.confirm();
    }

}

registry.category("pos_screens").add("SchoolListScreen", SchoolsListScreen);
