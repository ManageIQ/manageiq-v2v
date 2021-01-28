#!/bin/bash

if [ "$TEST_SUITE" = "javascript" ]
then
  yarn test --runInBand
else
  bundle exec rake
fi
