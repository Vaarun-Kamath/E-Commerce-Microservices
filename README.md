# Jenkins

## Running Jenkins in a Docker Container
Replace ```<jenkins-container>``` with any name to identify your container
```
docker run -p 8080:8080 -p 50000:50000 -d --name <jenkins-container> -v /var/run/docker.sock:/var/run/docker.sock -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts
```
Run Interactive shell in ```<jenkins-container>```
```
docker exec -it --user root <jenkins-container> bash
```
Run the following within the interactive shell
```
curl https://get.docker.com/ > dockerinstall && chmod 777 dockerinstall && ./dockerinstall
chmod 666 /var/run/docker.sock
cat /var/jenkins_home/secrets/initialAdminPassword
# if doesn't exist jenkins must already have a session token stored, so just login at localhost:8080
```

open url: ```localhost:8080```

if promted, click “Select Plugins to Install” 
check the GitHub option

## Using Jenkins 
### 1. Adding dockerhub Credentials
- Navigate to Jenkins server Dashboard
- click your username
- click credentials
- under parent, click global
- click add credentials
- put username and user_id as your dockerhub_id
- password is your dockerhub access token
### 2. Adding Docker Pipline
- Navigate to Jenkins server Dashboard
- click "Manage Jenkins"
- click "Plugins"
- type "Docker"
- check "Docker" and "Docker Pipeline"
- After installing, click "move to top..." 
### 3. Creating Pipeline job
- Navigate to Jenkins server Dashboard
- click "New Item"
- click "Pipline" and enter a name, then click "OK"
- check GithHub
- paste repository url
- Under Pipeline, select " ..with SCM"
- then select "Git"
- then add the branches, here ```*/main```
- Click "Apply" and Click "Save"


# Kubernetes
1. Open Docker Desktop
2. Run the following Commands

```
minikube start
kubectl apply -f ./k8s
minikube addons enable ingress
minikube tunnel
```




