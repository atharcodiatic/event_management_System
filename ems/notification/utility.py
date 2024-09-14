from django.core.mail import send_mail
from django.conf import settings

def send_reminder_email(recipient_email, event_title, event_date):
    subject = f'Reminder: {event_title}'
    message = f'Dear User,\n\nThis is a reminder for the event "{event_title}" scheduled on {event_date}.\n\nBest Regards,\nEvent Management Team'
    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [recipient_email])