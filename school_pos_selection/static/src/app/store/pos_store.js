/** @odoo-module */

import { Component, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { usePos } from "@point_of_sale/app/store/pos_hook";
import { PosStore } from "@point_of_sale/app/store/pos_store";
import { patch } from "@web/core/utils/patch";
import { ErrorPopup } from "@point_of_sale/app/errors/popups/error_popup";
import { _t } from "@web/core/l10n/translation";


patch(PosStore.prototype, {

    // Select school function with restriction on school selection or change when refunding order.
    async selectSchool() {
        const currentOrder = this.get_order();
        if (!currentOrder) {
            return;
        }
        const currentSchool = currentOrder.get_school();
        if (currentOrder.getHasRefundLines()) {
            this.popup.add(ErrorPopup, {
                title: _t("Can't change or select school"),
                body: _t(
                    "Can't change or select school when refunding order , you should create a new order.",
                ),
            });
            return;
        }
        const { confirmed, payload: newSchool } = await this.showTempScreen("SchoolListScreen", {
            school: currentSchool,
        });
        if (confirmed) {
            currentOrder.set_school(newSchool);
        }
    },
});