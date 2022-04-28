from django.db import models
import random
import string

#To generate unique codes
def generate_unique_code_member():
    length = 20

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Member.objects.filter(m_id=code).count() == 0:
            break

    return code

def generate_unique_code_manufacturer():
    length = 20

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Manufacturer.objects.filter(manufacturer_id=code).count() == 0:
            break

    return code


# Create your models here.
class Shippingcompany(models.Model):
    sc_id = models.CharField(primary_key=True, max_length=20)
    sc_name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'ShippingCompany'


class Bank(models.Model):
    card_num = models.ForeignKey('Membercardinfo', models.DO_NOTHING, db_column='card_num', blank=True, null=True)
    balance = models.FloatField()

    class Meta:
        managed = True
        db_table = 'bank'


class Instoreorder(models.Model):
    order = models.ForeignKey('Orderlist', models.DO_NOTHING)
    s = models.ForeignKey('Store', models.DO_NOTHING, blank=True, null=True)
    p = models.ForeignKey('Product', models.DO_NOTHING, blank=True, null=True)
    quantity = models.IntegerField()
    customer_type = models.IntegerField(blank=True, null=True)
    m = models.ForeignKey('Member', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'instoreOrder'


class Manufacturer(models.Model):
    manufacturer_id = models.CharField(primary_key=True, max_length=20)
    manufacturer_name = models.CharField(max_length=100, blank=True, null=True)
    email = models.CharField(max_length=30)
    phone_num = models.CharField(max_length=20)

    class Meta:
        managed = True
        db_table = 'manufacturer'

    def __str__(self):
        return self.manufacturer_name


class Member(models.Model):
    m_id = models.CharField(primary_key=True, default = generate_unique_code_member, max_length=20)
    password = models.CharField(max_length=50)
    name = models.CharField(max_length=20)
    phone = models.CharField(max_length=20)
    email = models.CharField(unique=True, max_length=20, blank=True, null=True)
    type = models.IntegerField(blank=True, null=True)
    user_status = models.IntegerField(blank=True, null=True)
    reg_date = models.DateField()
    billing_date = models.DateField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'member'

    def __str__(self):
        return self.name


class Memberaddress(models.Model):
    m = models.ForeignKey(Member, models.DO_NOTHING, blank=True, null=True)
    address1 = models.CharField(max_length=50)
    address2 = models.CharField(max_length=50, blank=True, null=True)
    state = models.CharField(max_length=2)
    zipcode = models.CharField(max_length=15)

    class Meta:
        managed = True
        db_table = 'memberAddress'


class Membercardinfo(models.Model):
    m = models.OneToOneField(Member, models.DO_NOTHING, primary_key=True)
    card_num = models.CharField(unique=True, max_length=20)
    card_name = models.CharField(max_length=30)
    card_exp_month = models.IntegerField(blank=True, null=True)
    card_exp_year = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'memberCardInfo'
        unique_together = (('m', 'card_num'),)


class Onlineorder(models.Model):
    order = models.ForeignKey('Orderlist', models.DO_NOTHING)
    p = models.ForeignKey('Product', models.DO_NOTHING, blank=True, null=True)
    quantity = models.IntegerField()
    customer_type = models.IntegerField(blank=True, null=True)
    m = models.ForeignKey(Member, models.DO_NOTHING, blank=True, null=True)
    email = models.CharField(max_length=30, blank=True, null=True)
    card_info = models.CharField(max_length=20)
    address1 = models.CharField(max_length=50)
    address2 = models.CharField(max_length=50, blank=True, null=True)
    state = models.CharField(max_length=2)
    zip_code = models.CharField(max_length=15)
    phone_num = models.BigIntegerField()
    recipient_name = models.CharField(max_length=30)
    recipient_phone = models.BigIntegerField()
    sc = models.ForeignKey(Shippingcompany, models.DO_NOTHING, blank=True, null=True)
    tracking_num = models.CharField(max_length=20)

    class Meta:
        managed = True
        db_table = 'onlineOrder'


class Orderlist(models.Model):
    order_id = models.CharField(primary_key=True, max_length=10)
    order_date = models.DateField()

    class Meta:
        managed = True
        db_table = 'orderList'


class Product(models.Model):
    p_id = models.CharField(primary_key=True, max_length=10)
    category = models.CharField(max_length=30)
    p_name = models.CharField(max_length=50)
    wholesale_price = models.FloatField()
    instore_price = models.FloatField()
    manufacturer = models.ForeignKey(Manufacturer, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'product'

    def __str__(self):
        return self.p_name

    def natural_key(self):
        return (self.p_id)
    


class Store(models.Model):
    s_id = models.CharField(primary_key=True, max_length=10)
    address = models.CharField(max_length=20)
    state = models.CharField(max_length=2)
    zipcode = models.CharField(max_length=15)

    class Meta:
        managed = True
        db_table = 'store'
    
    def __str__(self):
        return self.s_id


class Storeinv(models.Model):
    s = models.ForeignKey(Store, models.DO_NOTHING, default='')
    p = models.ForeignKey(Product, models.DO_NOTHING, default='')
    quantity = models.IntegerField(blank=True, null=True)
    threshold = models.IntegerField(blank=True, null=True)
    restock = models.DateField()
    reorder = models.DateField()

    class Meta:
        managed = True
        db_table = 'storeINV'
        unique_together = (('s', 'p'),)

    def __str__(self):
        return self.p.p_name


class Storereorder(models.Model):
    s = models.OneToOneField(Store, models.DO_NOTHING, primary_key=True)
    w = models.ForeignKey('Warehouse', models.DO_NOTHING, blank=True, null=True)
    p = models.ForeignKey(Product, models.DO_NOTHING)
    quantity = models.IntegerField(blank=True, null=True)
    reorderdate = models.DateField(db_column='reorderDate')  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'storeReorder'
        unique_together = (('s', 'p', 'reorderdate'),)


class Warehouse(models.Model):
    w_id = models.CharField(primary_key=True, max_length=10)
    address1 = models.CharField(max_length=20)
    state = models.CharField(max_length=2)
    zipcode = models.CharField(max_length=15)

    class Meta:
        managed = True
        db_table = 'warehouse'

    def __str__(self):
        return self.w_id


class Warehouseinv(models.Model):
    w = models.ForeignKey(Warehouse, models.DO_NOTHING, default='')
    p = models.ForeignKey(Product, models.DO_NOTHING, default ='')
    quantity = models.IntegerField(blank=True, null=True)
    threshold = models.IntegerField(blank=True, null=True)
    restock = models.DateField()
    reorder = models.DateField()

    class Meta:
        managed = True
        db_table = 'warehouseINV'
        unique_together = (('w', 'p'),)

    def __str__(self):
        return self.p.p_name


class Warehousereorder(models.Model):
    w = models.OneToOneField(Warehouse, models.DO_NOTHING, primary_key=True)
    manufacturer = models.ForeignKey(Manufacturer, models.DO_NOTHING, blank=True, null=True)
    p = models.ForeignKey(Product, models.DO_NOTHING)
    quantity = models.IntegerField(blank=True, null=True)
    reorderdate = models.DateField(db_column='reorderDate')  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'warehouseReorder'
        unique_together = (('w', 'p', 'reorderdate'),)


class Whcoverage(models.Model):
    w = models.OneToOneField(Warehouse, models.DO_NOTHING, primary_key=True)
    state = models.CharField(max_length=10)

    class Meta:
        managed = True
        db_table = 'whCoverage'
        unique_together = (('w', 'state'),)


class Whstore(models.Model):
    w = models.OneToOneField(Warehouse, models.DO_NOTHING, primary_key=True)
    s = models.ForeignKey(Store, models.DO_NOTHING)

    class Meta:
        managed = True
        db_table = 'whStore'
        unique_together = (('w', 's'),)
