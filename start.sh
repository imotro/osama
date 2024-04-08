pid=$(lsof -t -i:8080)
kill "$pid"
echo "Killed $pid"
node index.js