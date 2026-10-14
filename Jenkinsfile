
pipeline {
    agent any

    environment {
        IMAGE_NAME = 'wanderlust'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} .'
            }
        }

        stage('Test') {
            steps {
                sh 'npm ci'
                sh 'npm test --if-present'
            }
        }

        stage('Approval for Deployment') {
            steps {
                input message: 'Approve deployment to production?',
                      ok: 'Approve'
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([
                    string(
                        credentialsId: 'RENDER_DEPLOY_HOOK',
                        variable: 'DEPLOY_HOOK'
                    )
                ]) {
                    sh 'curl --fail --silent --show-error -X POST "$DEPLOY_HOOK"'
                }
            }
        }
    }

    post {
        success {
            emailext(
                to: 'sujeets2330@example.com',
                subject: "SUCCESS: ${JOB_NAME} #${BUILD_NUMBER}",
                body: """
                Build completed successfully!

                Project: ${JOB_NAME}
                Build Number: ${BUILD_NUMBER}
                Status: SUCCESS

                Check console output: ${BUILD_URL}
                """
            )
        }

        failure {
            emailext(
                to: 'sujeets2330@example.com',
                subject: "FAILED: ${JOB_NAME} #${BUILD_NUMBER}",
                body: """
                The CI/CD pipeline has failed.

                Project: ${JOB_NAME}
                Build Number: ${BUILD_NUMBER}
                Status: FAILURE

                Check console output: ${BUILD_URL}
                """
            )
        }
    }
}
