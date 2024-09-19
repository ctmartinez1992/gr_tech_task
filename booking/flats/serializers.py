from rest_framework import serializers
from flats.models import Booking


class BookingSerializer(serializers.ModelSerializer):
    flat_name = serializers.CharField(source="flat.name")
    previous_booking = serializers.SerializerMethodField()
    
    class Meta:
        model = Booking
        fields = ('id', 'flat_name', 'checkin', 'checkout', "previous_booking")
        read_only_fields = ["previous_booking"]

    def get_previous_booking(self, obj):
        try:
            return obj.get_previous_by_checkout(flat=obj.flat).id
        except Booking.DoesNotExist:
            return None
