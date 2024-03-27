@echo off


echo Make sure you have ingress running, if not run init-nginx.bat

pause

echo Applying k8s configuration

kubectl apply -f k8s