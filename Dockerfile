FROM postgres:latest

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=mysecretpassword
ENV POSTGRES_DB=blog

COPY src/main/resources/all_in_one.sql /docker-entrypoint-initdb.d/