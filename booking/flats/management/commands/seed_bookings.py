from django.core.management.base import BaseCommand
from flats.factories import BookingFactory
import logging


logger = logging.getLogger(__name__)


class Command(BaseCommand):
    def handle(self, *args, **options):
        bookings = BookingFactory.create_batch(100)
        logger.debug(f"Added {len(bookings)} bookings.")
