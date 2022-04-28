from itertools import product
from django.contrib import admin
from .models import Manufacturer, Member, Product, Store, Storeinv, Warehouse, Warehouseinv

# Register your models here.
admin.site.register(Product)
admin.site.register(Manufacturer)
admin.site.register(Member)
admin.site.register(Store)
admin.site.register(Storeinv)
admin.site.register(Warehouse)
admin.site.register(Warehouseinv)
