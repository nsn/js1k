#!/bin/sh
#cat shmup.small.js \
/usr/bin/java -jar ../lib/yuicompressor-2.4.2.jar shmup.small.js \
| sed -r 's/length\(/A\(/g' \
| sed -r 's/norm\(/B\(/g' \
| sed -r 's/mul\(/D\(/g' \
| sed -r 's/sub\(/E\(/g' \
| sed -r 's/vec\(/F\(/g' \
| sed -r 's/user\(/G\(/g' \
| sed -r 's/shuttle\(/H\(/g' \
| sed -r 's/obj/I/g' \
| sed -r 's/shot\(/J\(/g' \
| sed -r 's/prep\(/K\(/g' \
| sed -r 's/draw\(/L\(/g' \
| sed -r 's/col\(/N\(/g' \
| sed -r 's/loop/O/g' \
| sed -r 's/wave/P/g' \
| sed -r 's/shoot/Q/g' \
| sed -r 's/init\(/S\(/g' \
| sed -r 's/start\(/T\(/g' \
| sed -r 's/hit\(/u\(/g' \
| sed -r 's/startt/U/g' \
| sed -r 's/player/V/g' \
| sed -r 's/keys/W/g' \
| sed -r 's/enemies/X/g' \
| sed -r 's/shots/Y/g' \
| sed -r 's/lives/Z/g' \
| sed -r 's/score/z/g' \
| sed -r 's/\.pos/\.A/g' \
| sed -r 's/\.dir/\.B/g' \
| sed -r 's/\.bound/\.C/g' \
| sed -r 's/\.con/\.D/g' \
| sed -r 's/\.scalef/\.F/g' \
| sed -r 's/\.color/\.G/g' \
| sed -r 's/\.speed/\.H/g' \
| sed -r 's/\.shift/\.J/g' \
| sed -r 's/\.verts/\.K/g' \
| sed -r 's/\.unc/\.L/g' \
| sed -r 's/\.upd/\.M/g' \
| php compress.php

