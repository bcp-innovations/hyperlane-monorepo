#!/usr/bin/env bash

function cleanup() {
  docker compose down
}

cleanup

echo "Preparing E2E tests"
docker compose up --detach --wait

echo "Running E2E tests"
yarn mocha --config .mocharc-e2e.json

cleanup

echo "Completed E2E tests"
