@echo off

echo Applying ingress controller for k8s

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.0/deploy/static/provider/cloud/deploy.yaml --wait

echo Ingress controller applied successfully