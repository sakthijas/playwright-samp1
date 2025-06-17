pipeline {
    agent any

    environment {
        PATH = "/usr/local/bin:$PATH"
    }

    stages {
        stage('Run Playwright Tests') {
            steps {
                sh '''
                    docker run --rm -i \
                      -v $WORKSPACE:/home/pwuser/project \
                      -w /home/pwuser/project \
                      mcr.microsoft.com/playwright:v1.53.0-jammy \
                      npx playwright test
                '''
            }
        }
    }
}