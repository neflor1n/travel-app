pipeline {
    agent any

    stages {
        stage('Build Docker image') {
            steps {
                sh 'docker build -t travel-app:latest .'
            }
        }
        stage('Run tests in Docker') {
            steps {
                sh 'docker run --rm travel-app:latest npm test'
            }
        }
        stage('Run container') {
            steps {
                sh 'docker run -d --name travel-app-test -p 3000:3000 travel-app:latest'
            }
        }
        stage('Test /travel endpoint') {
            steps {
                sleep 5
                sh 'curl --fail http://localhost:3000/travel | grep "Моё любимое место для путешествий — Япония."'
            }
        }
    }
}
