@echo off

echo Docker login...
docker login

echo Building Docker image api...
docker build -t silpo-api . 

echo Tagging Docker image api...
docker tag silpo-api:latest mrsamix/silpo-api:latest

echo Pushing Docker image api to repository...
docker push mrsamix/silpo-api:latest

echo Done ---api---!
pause 