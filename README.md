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

If promted, click “Select Plugins to Install” 
- Check the GitHub option
- Uncheck Ant and Gradle option (for faster installation only) [OPTIONAL]

## Using Jenkins 
### 1. Adding dockerhub Credentials
- Navigate to Jenkins server Dashboard
- Click your username
- Click credentials
- Under parent, click global
- Click add credentials
- Put username and user_id as your dockerhub_id
- Password is your dockerhub access token
### 2. Adding Docker Pipline
- Navigate to Jenkins server Dashboard
- Click "Manage Jenkins"
- Click "Plugins"
- Type "Docker"
- Check "Docker" and "Docker Pipeline"
- After installing, click "Go back to the top page" (This will allow you to run, without restarting jenkins) 
### 3. Creating Pipeline job
- Navigate to Jenkins server Dashboard
- Click "New Item"
- Click "Pipline" and enter a name, then click "OK"
- Check GithHub
- Paste repository url
- Under Pipeline, select " ..with SCM"
- Then select "Git"
- Then add the branches, here ```*/main```
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

# Links
https://faun.pub/how-to-install-docker-in-jenkins-container-4c49ba40b373


