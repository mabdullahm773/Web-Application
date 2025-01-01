pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'huzaifa305/web-Application'
        DOCKER_REGISTRY = 'docker.io'
    }
    stages {
        stage('Clean Workspace') {
            steps {
                script {
                    deleteDir() // Clean the previous workspace
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
                withCredentials([usernamePassword(credentialsId: 'A-docker-credentials', 
                                                  usernameVariable: 'A-DOCKER_USERNAME', 
                                                  passwordVariable: 'A-DOCKER_PASSWORD')]) {
                    script {
                        echo "Logging in to Docker registry: ${DOCKER_REGISTRY} with user: ${DOCKER_USERNAME}"

                        bat """
                            docker login %DOCKER_REGISTRY% -u %DOCKER_USERNAME% -p %DOCKER_PASSWORD%
                        """

                        echo "Pushing Docker image: ${DOCKER_IMAGE}"

                        bat """
                            docker push %DOCKER_IMAGE%
                        """

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
                    bat 'docker run -d -p 5000:5000 %DOCKER_IMAGE%'
                }
            }
        }
        stage('Debug Docker Container') {
            steps {
                script {
                    echo "Listing running Docker containers:"
                    bat 'docker ps'
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
            script {
                slackSend(
                    channel: '#ecommerce-web-applicaiton',
                    message: "Pipeline succeeded! The Docker image ${DOCKER_IMAGE} was built and pushed successfully."
                )
                emailext(
                    to: 'mabdullahm773@gmail.com',
                    subject: "Jenkins Pipeline Success - ${JOB_NAME} #${BUILD_NUMBER}",
                    body: """<p>Pipeline <b>${JOB_NAME}</b> build <b>${BUILD_NUMBER}</b> succeeded!</p>
                             <p>Details:</p>
                             <ul>
                               <li>Docker Image: ${DOCKER_IMAGE}</li>
                               <li>Job: <a href="${BUILD_URL}">${BUILD_URL}</a></li>
                             </ul>"""
                )
            }
        }
        failure {
            echo 'Pipeline failed.'
             script {
                slackSend(
                    channel: '#ecommerce-web-applicaiton',
                    message: "Pipeline failed! Please check the Jenkins logs for details."
                )
                emailext(
                    to: 'mabdullahm773@gmail.com',
                    subject: "Jenkins Pipeline Failure - ${JOB_NAME} #${BUILD_NUMBER}",
                    body: """<p>Pipeline <b>${JOB_NAME}</b> build <b>${BUILD_NUMBER}</b> failed.</p>
                             <p>Details:</p>
                             <ul>
                               <li>Job: <a href="${BUILD_URL}">${BUILD_URL}</a></li>
                               <li>Please check the Jenkins logs for more details.</li>
                             </ul>"""
                )
            }
        }
    }
}
