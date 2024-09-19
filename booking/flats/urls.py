from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from flats.views import BookingView

router = routers.DefaultRouter()
router.register('bookings', BookingView, 'flats')
