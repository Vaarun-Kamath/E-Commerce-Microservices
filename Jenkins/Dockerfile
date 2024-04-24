FROM jenkins/jenkins:lts
#FROM ubuntu:20.04
# if we want to install via apt
USER root
RUN apt-get update && apt-get install -y make g++ nodejs npm --fix-missing

#downloading docker for testing
RUN curl -sSL https://get.docker.com/ | sh
VOLUME /var/jenkins_home
# drop back to the regular jenkins user - good practice
USER jenkins