
from django.urls import path
from .views import CreateMemberView, GetManufacturerView, GetProductView, StoreInventoryView

urlpatterns = [
    path('', CreateMemberView.as_view()),
    path('StoreInventoryView/', StoreInventoryView.as_view()),
    path('GetProductView/', GetProductView.as_view()),
    path('GetManufacturerView/', GetManufacturerView.as_view())
]