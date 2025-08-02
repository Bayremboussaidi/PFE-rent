# 🔍 SonarQube Integration Guide

## **Overview**
SonarQube is now integrated into your CI/CD pipeline for code quality analysis across all services.

## **What SonarQube Analyzes**

### **Backend (Java/Spring Boot)**
- ✅ **Code Quality**: Complexity, duplications, maintainability
- ✅ **Security**: Vulnerability detection, security hotspots
- ✅ **Coverage**: Test coverage with JaCoCo
- ✅ **Bugs**: Potential bugs and code smells
- ✅ **Technical Debt**: Code quality metrics

### **Frontend (TypeScript/Angular)**
- ✅ **Code Quality**: TypeScript best practices
- ✅ **Security**: Frontend security vulnerabilities
- ✅ **Coverage**: Test coverage with Karma
- ✅ **Maintainability**: Code complexity analysis

### **AI Service (Python)**
- ✅ **Code Quality**: Python best practices
- ✅ **Linting**: Pylint analysis
- ✅ **Security**: Python security issues

## **CI/CD Integration**

### **Pipeline Stage**
```yaml
stages:
  - checkout
  - test
  - sonarqube  # ← New stage
  - build_frontend
  - build_backend
  - build_ai
  - build_images
  - push_images
  - deploy_minikube
```

### **Required GitLab Variables**
Set these in GitLab → Settings → CI/CD → Variables:

1. **`SONAR_TOKEN`** - Your SonarQube authentication token
2. **`SONAR_HOST_URL`** - SonarQube server URL (default: http://sonarqube:9000)

## **Local SonarQube Setup**

### **1. Start SonarQube Locally**
```bash
# Using Docker Compose (already configured)
docker-compose up -d sonardb sonarqube

# Access SonarQube
# URL: http://localhost:9000
# Default credentials: admin/admin
```

### **2. Generate SonarQube Token**
1. Login to SonarQube (http://localhost:9000)
2. Go to **My Account** → **Security**
3. Generate a new token
4. Copy the token to GitLab variables

### **3. Run Analysis Locally**

#### **Backend Analysis**
```bash
cd back
mvn clean verify sonar:sonar \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=YOUR_TOKEN
```

#### **Frontend Analysis**
```bash
cd frontend
npm install
npm run build
npx sonar-scanner \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=YOUR_TOKEN
```

## **Quality Gates**

### **Default Quality Gates**
- **Coverage**: > 80%
- **Duplications**: < 3%
- **Maintainability**: A grade
- **Reliability**: A grade
- **Security**: A grade

### **Custom Quality Gates**
You can configure custom quality gates in SonarQube:
1. Go to **Administration** → **Quality Gates**
2. Create custom gates for your project
3. Set thresholds for your team

## **Reports and Metrics**

### **Available Reports**
- **Code Coverage**: Test coverage percentage
- **Code Duplication**: Duplicated code blocks
- **Technical Debt**: Time to fix all issues
- **Security Hotspots**: Security vulnerabilities
- **Code Smells**: Maintainability issues

### **Metrics Dashboard**
- **Reliability**: Bugs and reliability issues
- **Security**: Vulnerabilities and security hotspots
- **Maintainability**: Code smells and technical debt
- **Coverage**: Test coverage metrics

## **Benefits**

### **Code Quality**
- ✅ **Early Detection**: Find issues before production
- ✅ **Consistent Standards**: Enforce coding standards
- ✅ **Technical Debt**: Track and reduce technical debt
- ✅ **Best Practices**: Follow language-specific best practices

### **Team Productivity**
- ✅ **Automated Reviews**: Reduce manual code review time
- ✅ **Learning**: Team learns from quality feedback
- ✅ **Standards**: Consistent code quality across team
- ✅ **Documentation**: Self-documenting code quality

### **Business Value**
- ✅ **Reduced Bugs**: Fewer production issues
- ✅ **Faster Development**: Cleaner code is easier to maintain
- ✅ **Security**: Early security vulnerability detection
- ✅ **Compliance**: Meet coding standards requirements

## **Troubleshooting**

### **Common Issues**
1. **SonarQube not starting**: Check Docker logs
2. **Analysis fails**: Verify token and URL
3. **No coverage**: Ensure tests are running
4. **Connection issues**: Check network connectivity

### **Useful Commands**
```bash
# Check SonarQube status
curl http://localhost:9000/api/system/status

# View SonarQube logs
docker logs sonarqube

# Restart SonarQube
docker-compose restart sonarqube
```

## **Next Steps**
1. **Set up GitLab variables** (SONAR_TOKEN)
2. **Configure quality gates** in SonarQube
3. **Run first analysis** via CI/CD
4. **Review results** and improve code quality
5. **Set up team notifications** for quality issues

**🎯 SonarQube is now fully integrated and ready to improve your code quality!** 🔍✨ 