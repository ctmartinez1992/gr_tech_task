from rest_framework import viewsets, pagination
from flats.serializers import BookingSerializer
from flats.models import Booking


class BookingView(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    queryset = Booking.objects.all()
