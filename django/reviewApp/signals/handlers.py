from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
from reviewApp.models import Reviewer


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_customer_for_new_user(sender, **kwargs):
    if kwargs['created']:
        Reviewer.objects.create(user=kwargs["instance"])
