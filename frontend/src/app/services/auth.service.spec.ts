import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should validate email format', () => {
    const validEmail = 'test@example.com';
    const invalidEmail = 'invalid-email';
    
    expect(service.isValidEmail(validEmail)).toBeTruthy();
    expect(service.isValidEmail(invalidEmail)).toBeFalsy();
  });

  it('should check if user is logged in', () => {
    // Mock localStorage
    spyOn(localStorage, 'getItem').and.returnValue('mock-token');
    
    expect(service.isLoggedIn()).toBeTruthy();
  });

  it('should logout user', () => {
    spyOn(localStorage, 'removeItem');
    spyOn(localStorage, 'clear');
    
    service.logout();
    
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(localStorage.clear).toHaveBeenCalled();
  });
}); 