FROM python:3

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV DJANGO_SETTINGS_MODULE=ems.settings
WORKDIR /app/backend

COPY requirements.txt /app/backend/

# Install system dependencies
# RUN apt-get update && apt-get install -y --no-install-recommends \
#     tzdata \
#     build-essential

# Build psycopg2-binary from source -- add required required dependencies
RUN pip install --upgrade pip
RUN pip install watchdog
RUN  pip install --no-cache-dir -r requirements.txt 
#Using the --no-cache Option: If you run Docker with the --no-cache flag, it will force a fresh build of every layer, including npm install, bypassing the cache.

COPY . /app/backend/
