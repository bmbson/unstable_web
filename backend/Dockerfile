FROM python:latest

WORKDIR /app

COPY ./app/requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

COPY ./app /app

CMD ["fastapi", "dev", "/app/main.py", "--host", "0.0.0.0", "--port", "9999"]
