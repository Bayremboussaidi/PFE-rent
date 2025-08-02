# 🧪 Testing Configuration

## **Testing Strategy (Limited but Essential)**

### **Backend Testing (Spring Boot)**
- **Framework**: JUnit 5 + Mockito
- **Coverage**: Service layer tests
- **Command**: `mvn test`
- **Reports**: Surefire reports in `target/surefire-reports/`

### **Frontend Testing (Angular)**
- **Framework**: Jasmine + Karma
- **Coverage**: Service and component tests
- **Command**: `ng test`
- **Reports**: Coverage in `coverage/` directory

### **AI Testing (Python)**
- **Framework**: unittest + pytest
- **Coverage**: Service functionality tests
- **Command**: `python test_ai_service.py`
- **Reports**: Console output

## **CI/CD Integration**
- **Stage**: Added `test` stage before build
- **Execution**: Tests run automatically on every commit
- **Failure Handling**: `allow_failure: true` (tests won't block deployment)
- **Artifacts**: Test reports saved for 1 week

## **Test Coverage (Limited)**
- ✅ **Backend**: Basic service tests (3 test cases)
- ✅ **Frontend**: Basic service tests (4 test cases)
- ✅ **AI**: Basic functionality tests (4 test cases)
- ❌ **Integration Tests**: Not included (limited scope)
- ❌ **E2E Tests**: Not included (limited scope)

## **Running Tests Locally**

### **Backend**
```bash
cd back
mvn test
```

### **Frontend**
```bash
cd frontend
npm test
```

### **AI**
```bash
cd ai
python test_ai_service.py
```

## **Test Quality Gates**
- **Minimum**: Tests must compile and run
- **Coverage**: No minimum coverage requirement (limited scope)
- **Performance**: No performance testing (limited scope)

**Note**: This is a limited testing setup focused on essential functionality. For production, consider adding more comprehensive testing. 