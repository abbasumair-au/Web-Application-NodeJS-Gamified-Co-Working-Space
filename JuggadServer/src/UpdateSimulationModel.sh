kill -9 $(lsof -t -i:9000)
echo "Old process killed"
sudo python3 /home/ubuntu/flaskapp/updateSimulationModel.py
echo "refreshed ML model is back online"
