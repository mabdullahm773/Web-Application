pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'huzaifa305/web-application:latest'
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_USERNAME = 'huzaifa305'  // Hardcoded Docker username
        DOCKER_PASSWORD = 'Jadenmartel@786'  // Hardcoded Docker password
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
                        bat 'docker build -t %DOCKER_IMAGE% .'
                    }
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    // Login to Docker Hub and push the image using hardcoded credentials
                    bat """
                        echo %DOCKER_PASSWORD% | docker login %DOCKER_REGISTRY% -u %DOCKER_USERNAME% --password-stdin
                        docker push %DOCKER_IMAGE%
                    """
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    // Run the Docker container
                    bat 'docker run -d %DOCKER_IMAGE%'
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
