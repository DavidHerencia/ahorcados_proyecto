FROM python:3
ENV FLASK_APP=player.py
ENV FLASK_ENV=production
ENV FLASK_DEBUG=0
WORKDIR /app
RUN pip3 install --no-cache-dir flask sqlalchemy flask_sqlalchemy flask-cors
COPY . .
CMD [ "flask", "run", "--host=0.0.0.0"]

