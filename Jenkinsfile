pipeline {
    agent any

    environment {
    PATH = "/Users/sakthivel/.nvm/versions/node/v22.16.0/bin:$PATH"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npm test'
            }
        }
    }
}