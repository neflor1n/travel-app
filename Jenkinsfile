pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'travel-app'
        CONTAINER_NAME = 'travel-app-container'
        APP_PORT = 3000
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} .'
                sh 'docker tag ${DOCKER_IMAGE}:${BUILD_NUMBER} ${DOCKER_IMAGE}:latest'
            }
        }
        
        stage('Stop Previous Container') {
            steps {
                script {
                    sh 'docker stop ${CONTAINER_NAME} || true'
                    sh 'docker rm ${CONTAINER_NAME} || true'
                }
            }
        }
        
        stage('Run Container') {
            steps {
                sh 'docker run -d -p ${APP_PORT}:${APP_PORT} --name ${CONTAINER_NAME} ${DOCKER_IMAGE}:latest'
            }
        }
        
        stage('Test Application') {
            steps {
                script {
                    // Wait for the application to start
                    sh 'sleep 5'
                    
                    // Check if the /travel endpoint is working
                    def response = sh(script: 'curl -s http://localhost:${APP_PORT}/travel', returnStdout: true).trim()
                    
                    if (!response.contains('место для путешествий')) {
                        error "Endpoint /travel не возвращает ожидаемый результат"
                    }
                }
            }
        }
    }
    
    post {
        failure {
            sh 'docker stop ${CONTAINER_NAME} || true'
            sh 'docker rm ${CONTAINER_NAME} || true'
        }
    }
}
