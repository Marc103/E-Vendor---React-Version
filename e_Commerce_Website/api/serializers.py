from rest_framework import serializers

from .models import Member, Product, Storeinv, Manufacturer

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('p_id','category','p_name','wholesale_price','instore_price','manufacturer')

class ManufacturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manufacturer
        fields = ("manufacturer_id","manufacturer_name","email","phone_num")

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ('m_id','password','name','phone','email','type','user_status','reg_date','billing_date')

class CreateMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ('password','name','phone','email','type','user_status','reg_date','billing_date')

class PostStoreInventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Storeinv
        fields = ('s',)

class StoreInventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Storeinv
        fields = ('s','p','quantity','threshold','restock','reorder')
