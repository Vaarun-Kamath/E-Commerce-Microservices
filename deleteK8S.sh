#!/bin/bash

echo "Deleting deployments"
kubectl delete deployments --all

echo "Deleting services"
kubectl delete service customer
kubectl delete service database
kubectl delete service nginx
kubectl delete service products
kubectl delete service store
kubectl delete service store-server-cluster-ip-service
kubectl delete service customer-server-cluster-ip-service
kubectl delete service products-server-cluster-ip-service
kubectl delete service database-server-cluster-ip-service

kubectl get services
kubectl get deployments
kubectl get pods

# echo "Deleting images"
# docker rmi cc-nginx --force
# docker rmi cc-customer --force
# docker rmi cc-database --force
# docker rmi cc-products --force
# docker rmi cc-store --force

echo "Deleting ingress"
kubectl delete ingress nginx
kubectl delete ingress products
kubectl delete ingress store

# echo "FUCK OFF INGRESS"
# kubectl delete namespace ingress-nginx