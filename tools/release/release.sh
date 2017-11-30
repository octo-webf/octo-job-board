#!/usr/bin/env bash

set -eu

echo "Check for pending changes"
if [[ $(git status --porcelain) ]]; then
  echo "You have uncommitted changes. You can not release. Please commit or stash your changes before releasing." >&2
  exit 1
fi

echo "Fetch and pull branch dev on origin host"
git fetch origin dev
git pull origin dev

echo "Fetch and pull branch master on origin host"
git fetch origin master
git pull origin master

echo "Merge and push branch dev on master"
git checkout master
git merge -X theirs dev
git push origin master

echo "Go back to branch dev"
git checkout dev
git pull

exit 0
