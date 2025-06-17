pipeline {
    agent any

    stages {
        stage('Run Playwright Tests in Docker') {
            steps {
                script {
                    sh """
                    docker run --rm \
                      -v /Users/sakthivel/MyFolder/playwright/samp1:/home/pwuser/project \
                      -w /home/pwuser/project \
                      mcr.microsoft.com/playwright:v1.53.0-jammy \
                      npx playwright test
                    """
                }
            }
        }
    }
}