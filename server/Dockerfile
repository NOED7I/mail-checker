FROM alpine:latest

ADD mail-checker-server /mail-checker-server
RUN apk --no-cache add ca-certificates && update-ca-certificates

ENTRYPOINT ["/mail-checker-server"]

