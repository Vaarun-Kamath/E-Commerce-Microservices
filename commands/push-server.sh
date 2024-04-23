#!/bin/bash

echo Building and pushing images to Docker Hub

docker build -t varunchandrashekar1/store-server-593-594-606-607:latest ./server/store
echo Built store-server-593-594-606-607:latest

docker build -t varunchandrashekar1/customer-server-593-594-606-607:latest ./server/customer
echo Built customer-server-593-594-606-607:latest

docker build -t varunchandrashekar1/products-server-593-594-606-607:latest ./server/products
echo Built products-server-593-594-606-607:latest

docker build -t varunchandrashekar1/database-server-593-594-606-607:latest ./server/database
echo Built database-server-593-594-606-607:latest


docker push varunchandrashekar1/store-server-593-594-606-607:latest
echo Pushed store-server-593-594-606-607:latest to Docker Hub

docker push varunchandrashekar1/customer-server-593-594-606-607:latest
echo Pushed customer-server-593-594-606-607:latest to Docker Hub

docker push varunchandrashekar1/products-server-593-594-606-607:latest
echo Pushed products-server-593-594-606-607:latest to Docker Hub

docker push varunchandrashekar1/database-server-593-594-606-607:latest
echo Pushed database-server-593-594-606-607:latest to Docker Hub