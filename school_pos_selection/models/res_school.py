# -*- coding: utf-8 -*-

from odoo import models, fields, api
from odoo.exceptions import UserError

class ResSchool(models.Model):
    _name = 'res.school'
    _description = 'Schools'

    code = fields.Char(required=True)
    name = fields.Char(required=True)
    
    _sql_constraints = [('code_uniq', "unique(code)", "School code should be unique")]


    @api.model
    def get_schools_list(self):
        schools = self.search([])
        result = [{'id': school.id, 'name': school.name, 'code': school.code} for school in schools]
        return result
    
    def get_school_by_id(self, school_id):
        school = self.search([('id', '=', school_id)], limit=1)
        return school