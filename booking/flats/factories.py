import factory

from flats.models import Booking, Flat


class FlatFactory(factory.django.DjangoModelFactory):
    name = factory.Faker("name")

    class Meta:
        model = Flat


class BookingFactory(factory.django.DjangoModelFactory):
    flat = factory.SubFactory(FlatFactory)
    checkin = factory.Faker("date")
    checkout = factory.Faker("date")

    class Meta:
        model = Booking
