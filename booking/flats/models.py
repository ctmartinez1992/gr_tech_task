from django.db import models


class Flat(models.Model):
    name = models.CharField("Name", max_length=255)

    class Meta:
        ordering = ("name",)

class Booking(models.Model):
    flat = models.ForeignKey(Flat, on_delete=models.CASCADE, related_name="bookings", verbose_name="Flat")
    checkin = models.DateField("Check-In")
    checkout = models.DateField("Check-Out")

    class Meta:
        ordering = ("id", "checkin")
