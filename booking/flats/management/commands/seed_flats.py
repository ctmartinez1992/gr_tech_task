from django.core.management.base import BaseCommand
from flats.factories import BookingFactory, FlatFactory
import logging


logger = logging.getLogger(__name__)


class Command(BaseCommand):
    def handle(self, *args, **options):
        flats = FlatFactory.create_batch(10)
        logger.debug(f"Added {len(flats)} flats.")

        bookings = BookingFactory.create_batch(10, flat=flats[0])
        logger.debug(f"Added {len(bookings)} bookings.")
        bookings = BookingFactory.create_batch(5, flat=flats[1])
        logger.debug(f"Added {len(bookings)} bookings.")
        bookings = BookingFactory.create_batch(2, flat=flats[2])
        logger.debug(f"Added {len(bookings)} bookings.")
        bookings = BookingFactory.create_batch(1, flat=flats[3])
        logger.debug(f"Added {len(bookings)} bookings.")
        bookings = BookingFactory.create_batch(1, flat=flats[4])
        logger.debug(f"Added {len(bookings)} bookings.")
