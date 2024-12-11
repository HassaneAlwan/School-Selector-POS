# -*- coding: utf-8 -*-

from collections import defaultdict
from datetime import datetime
from functools import partial
from itertools import groupby
from markupsafe import Markup
from random import randrange

import base64
import logging
import psycopg2
import pytz
import re

from odoo import api, fields, models, tools, _
from odoo.tools import float_is_zero, float_round, float_repr, float_compare
from odoo.exceptions import ValidationError, UserError
from odoo.osv.expression import AND


class PosOrder(models.Model):
    _inherit = 'pos.order'


    @api.model
    def _order_fields(self, ui_order):
        vals = super()._order_fields(ui_order)
        vals.update({
            'school_id':   ui_order['school_id'] or False,
        })
        return vals
    
    school_id = fields.Many2one(
        comodel_name='res.school',
        string='School'
    )
