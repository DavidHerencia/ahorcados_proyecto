FROM python:3-slim
ENV FLASK_APP=lobby.py
ENV FLASK_ENV=production
ENV FLASK_DEBUG=0
WORKDIR /app
RUN apt-get update && apt-get install -y gcc pkg-config default-libmysqlclient-dev
RUN pip3 install --no-cache-dir flask sqlalchemy flask_sqlalchemy flask-cors mysqlclient
COPY . .
CMD [ "flask", "run", "--host=0.0.0.0"]

