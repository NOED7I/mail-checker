#!/bin/bash

CGO_ENABLED=0 go build -o mail-checker-server . && \
    sudo docker build -t b.gcr.io/txregistry/mail-checker . && \
    sudo gcloud docker push b.gcr.io/txregistry/mail-checker

