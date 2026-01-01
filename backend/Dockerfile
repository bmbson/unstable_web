FROM python:latest

RUN mkdir -p /app/static

WORKDIR /app

RUN pip install "fastapi[standard]"

RUN pip install "sqlmodel"
RUN pip install "psycopg2"

COPY ./app /app

CMD ["fastapi", "dev", "/app/main.py", "--host", "0.0.0.0", "--port", "9999"]
#CMD ["tail", "-f", "/dev/null"]
