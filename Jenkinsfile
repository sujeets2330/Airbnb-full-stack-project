
pipeline {
    agent any

    parameters {
        booleanParam(
            name: 'RUN_SECURITY_SCAN',
            defaultValue: false,
            description: 'Run Trivy Docker image vulnerability scan'
        )
    }

    environment {
        IMAGE_NAME = 'wanderlust'
        APP_URL = 'https://airbnb-full-stack-project-z8xi.onrender.com/listings'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test --if-present'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} .'
            }
        }

        stage('Validate Docker Image') {
            steps {
                sh 'docker image inspect ${IMAGE_NAME}:${BUILD_NUMBER}'
            }
        }

        stage('Security Scan') {
            when {
                expression {
                    params.RUN_SECURITY_SCAN
                }
            }
            steps {
                sh '''
                    trivy image \
                      --exit-code 1 \
                      --severity HIGH,CRITICAL \
                      ${IMAGE_NAME}:${BUILD_NUMBER}
                '''
            }
        }

        stage('Approval for Deployment') {
            steps {
                timeout(time: 10, unit: 'MINUTES') {
                    input(
                        message: 'Approve deployment to Render?',
                        ok: 'Deploy'
                    )
                }
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
                    sh '''
                        curl --fail --silent --show-error \
                          -X POST "$DEPLOY_HOOK"
                    '''
                }
            }
        }

        stage('Post-Deployment Verification') {
            steps {
                sh '''
                    curl --fail --silent --show-error \
                      --retry 12 \
                      --retry-delay 10 \
                      --retry-connrefused \
                      "$APP_URL"
                '''
            }
        }
    }

    post {
        success {
            emailext(
                to: 'sujeets2330@gmail.com',
                subject: "SUCCESS: ${JOB_NAME} #${BUILD_NUMBER}",
                body: """
                Pipeline completed successfully.

                Job: ${JOB_NAME}
                Build: ${BUILD_NUMBER}
                Status: SUCCESS

                Details: ${BUILD_URL}
                """
            )
        }

        failure {
            emailext(
                to: 'sujeets2330gmail.com',
                subject: "FAILED: ${JOB_NAME} #${BUILD_NUMBER}",
                body: """
                The CI/CD pipeline failed.

                Job: ${JOB_NAME}
                Build: ${BUILD_NUMBER}
                Status: FAILURE

                Check the failed stage and console log:
                ${BUILD_URL}
                """
            )
        }

        aborted {
            emailext(
                to: 'sujeets2330@gmail.com',
                subject: "ABORTED: ${JOB_NAME} #${BUILD_NUMBER}",
                body: """
                The pipeline was aborted or cancelled.

                Job: ${JOB_NAME}
                Build: ${BUILD_NUMBER}

                Details: ${BUILD_URL}
                """
            )
        }
    }
}
