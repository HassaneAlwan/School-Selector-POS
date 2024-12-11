# -*- coding: utf-8 -*-
{
    'name': "School Pos Select",
    'summary': "School Pos Select",
    'author': "Hassan Alwan",
    'category': 'POS',
    'version': '1.0',
    'depends': ['base', 'point_of_sale'],
    'data': [
        'security/ir.model.access.csv',
        'views/views.xml',
        'views/pos_order.xml',
    ],
    'assets': {
        'point_of_sale._assets_pos': [
            'school_pos_selection/static/src/**/*',
        ]
    }
}

