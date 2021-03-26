#!/usr/bin/env bash
set -u

if [[ $# -ne 1 ]]; then
    echo "usage: ./record_all.sh NUMBER_OF_ROBOTS" >&2
    exit 2
fi

NR_ROBOTS="$1"

child_pids=()
for (( r = 0; r < "$NR_ROBOTS"; r++ )); do
    ROBOT=$r node rw.js > recordings/out_$r.json &
    child_pids+=($!)
done

sleep 0.5

echo ""
echo "Saving output to the directory `recordings`."
echo ""
echo "Press enter to stop recording."
read

echo "Stopping recorder processes..."
kill ${child_pids[@]}
