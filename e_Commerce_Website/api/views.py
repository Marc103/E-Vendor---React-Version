from django.shortcuts import render
from .serializers import CreateMemberSerializer, MemberSerializer, ProductSerializer, PostStoreInventorySerializer, StoreInventorySerializer, ManufacturerSerializer
from .models import Manufacturer, Product, Member, Storeinv
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView




# Create your views here.
class GetProductView(generics.ListAPIView):
    def get(self, request, format = None):
        queryset = Product.objects.all()
        print(queryset)
        return Response(ProductSerializer(queryset, many=True).data, status=status.HTTP_200_OK)

class GetManufacturerView(generics.ListAPIView):
    def get(self, request, format = None):
        queryset = Manufacturer.objects.all()
        print(queryset)
        return Response(ManufacturerSerializer(queryset, many=True).data, status=status.HTTP_200_OK)


class CreateMemberView(APIView):
    serializer_class = CreateMemberSerializer
    def post(self, request, format = None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            password = serializer.data.get('password')
            name = serializer.data.get('name')
            phone = serializer.data.get('phone')
            email = serializer.data.get('email')
            type = serializer.data.get('type')
            user_status = serializer.data.get('user_status')
            reg_date = serializer.data.get('reg_date')
            billing_date = serializer.data.get('billing_date')

            member = Member(password = password, name = name, phone = phone, email = email, type = type, 
            user_status = user_status, reg_date = reg_date, billing_date = billing_date)
            member.save()
        
            return Response(MemberSerializer(member).data, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class StoreInventoryView(generics.ListAPIView):
    serializer_class = PostStoreInventorySerializer
  
    def post(self, request, format = None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            queryset = Storeinv.objects.filter(s = serializer.data.get('s'))
            print(queryset)
            return Response(StoreInventorySerializer(queryset, many=True).data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
            
        


    


