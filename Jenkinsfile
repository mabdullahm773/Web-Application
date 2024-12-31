pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'huzaifa305/web-application:latest'
        DOCKER_REGISTRY = 'docker.io'
        KUBECONFIG = 'C:\Users\Administrator\.kube\config' // Path to your kubeconfig file
    }
    stages {
        stage('Clean Workspace') {
            steps {
                script {
                    deleteDir() // Clean the workspace
                }
            }
        }
        stage('Checkout') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'Web-Project-Git', 
                                                  usernameVariable: 'username', 
                                                  passwordVariable: 'password')]) {
                    // Clone the GitHub repository using credentials
                    bat 'git clone https://%username%:%password%@github.com/mabdullahm773/Web-Application'
                }
            }
        }
        stage('List Files') {
            steps {
                bat 'dir'  // List the files in the workspace
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    dir('Web-Application') { // Navigate into the cloned repo directory
                        echo "Building Docker image: ${DOCKER_IMAGE}"
                        bat 'docker build -t %DOCKER_IMAGE% .'
                    }
                }
            }
        }
        stage('Debug Docker Image Build') {
            steps {
                script {
                    echo "Checking local Docker images after build:"
                    bat 'docker images'
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-credentials', 
                                                  usernameVariable: 'DOCKER_USERNAME', 
                                                  passwordVariable: 'DOCKER_PASSWORD')]) {
                    script {
                        echo "Logging in to Docker registry: ${DOCKER_REGISTRY} with user: ${DOCKER_USERNAME}"
                        bat """
                            echo %DOCKER_PASSWORD% | docker login %DOCKER_REGISTRY% -u %DOCKER_USERNAME% --password-stdin
                        """
                        echo "Pushing Docker image: ${DOCKER_IMAGE}"
                        bat 'docker push %DOCKER_IMAGE%'
                    }
                }
            }
        }
        stage('Debug Docker Image Push') {
            steps {
                script {
                    echo "Checking Docker registry for the pushed image:"
                    bat 'docker pull %DOCKER_IMAGE%'
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    echo "Running Docker container from image: ${DOCKER_IMAGE}"
                    bat 'docker run -d %DOCKER_IMAGE%'
                }
            }
        }
        stage('Debug Docker Container') {
            steps {
                script {
                    echo "Listing running Docker containers:"
                    bat 'docker ps'
                    echo "Checking container logs:"
                    bat 'docker logs $(docker ps -l -q)' // Gets logs of the last started container
                }
            }
        }

         stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig-credentials', variable: 'KUBECONFIG')]) {
                    script {
                        dir('Web-Application/k8s') { // Assuming Kubernetes manifests are in 'k8s' directory
                            echo "Applying Kubernetes manifests..."
                            bat 'kubectl apply -f deployment.yaml'
                            bat 'kubectl apply -f service.yaml'
                        }
                    }
                }
            }
        }
        stage('Debug Kubernetes Deployment') {
            steps {
                script {
                    echo "Checking Kubernetes resources..."
                    bat 'kubectl get pods'
                    bat 'kubectl get services'
                }
            }
        }
    }
    post {
        always {
            echo 'Pipeline completed.'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
