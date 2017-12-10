#!/bin/bash
cat /dev/urandom |LC_ALL=C tr -dc A-Z9 | fold -w 81 | head -n 1 | tr -d '\n'