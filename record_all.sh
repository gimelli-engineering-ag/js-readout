child_pids=()

for r in {0..3}; do
    ROBOT=$r node rw.js > out_$r.json &
    child_pids+=($!)
done

# echo ${child_pids[@]}

sleep 0.5

echo ""
echo "press enter to stop recording"
read

echo "killing processes"
kill ${child_pids[@]}
