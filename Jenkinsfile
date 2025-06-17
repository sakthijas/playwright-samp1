pipeline {
  agent {
    // Use Docker agent for consistency
    docker {
      image 'mcr.microsoft.com/playwright:v1.53.0-jammy'
    }
  }

  stages {
    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
      }
    }
    stage('Run Tests') {
      steps {
        sh 'npx playwright test'
      }
    }
  }
}