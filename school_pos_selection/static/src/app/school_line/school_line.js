/** @odoo-module */

import { Component } from "@odoo/owl";

export class SchoolLine extends Component {
    static template = "school_pos_selection.SchoolLine";

    get highlight() {
        return this._isSchoolSelected ? "highlight active" : "";
    }

    get _isSchoolSelected() {
        if (this.props.school && this.props.selectedSchool) {
            return this.props.school.id === this.props.selectedSchool.id;
        }
        else {
            return false;
        }
    }
}
