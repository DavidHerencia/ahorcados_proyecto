FROM python:3-slim
ENV FLASK_APP=game.py
ENV FLASK_ENV=production
ENV FLASK_DEBUG=0
WORKDIR /app
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
RUN pip3 install --no-cache-dir flask sqlalchemy flask_sqlalchemy flask-cors
COPY . .
CMD [ "flask", "run", "--host=0.0.0.0"]

