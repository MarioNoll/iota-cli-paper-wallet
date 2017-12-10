#!/bin/bash
cat /dev/urandom |tr -dc A-Z9|head -c${1:-81}