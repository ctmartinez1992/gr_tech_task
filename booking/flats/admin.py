from django.contrib import admin

from flats.models import Booking, Flat


class FlatAdmin(admin.ModelAdmin):
    pass


class BookingAdmin(admin.ModelAdmin):
    pass

admin.site.register(Flat, FlatAdmin)
admin.site.register(Booking, BookingAdmin)
