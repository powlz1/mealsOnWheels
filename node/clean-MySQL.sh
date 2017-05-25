#!/bin/bash
DBNAME="$1"

dropDB="DROP DATABASE IF EXISTS $DBNAME;"
createDB="CREATE DATABASE $DBNAME;"

query="${dropDB}${createDB}"

mysql -u root -p1234 -e "$query"

