/** @odoo-module */

import { ProductScreen } from "@point_of_sale/app/screens/product_screen/product_screen";
import { patch } from "@web/core/utils/patch";

patch(ProductScreen.prototype, {
    // Add the school to the product screen props bcz we need it in the other child screens.
    get school() {
        return this.currentOrder ? this.currentOrder.get_school() : null;
    },
});
