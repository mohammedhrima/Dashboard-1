+ stop containers: docker stop $(docker ps -aq)
+ remove containers: docker rm $(docker ps -aq)
