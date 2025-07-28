import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { User } from '../../models/user.model';

export interface KeycloakUserInfo {
  email?: string;
  preferred_username?: string;
  given_name?: string;
  family_name?: string;
  sub?: string; // User ID
}

@Injectable({ providedIn: 'root' })
export class KeycloakService {
  private _keycloak: Keycloak.KeycloakInstance;
  private _user: User | null = null;
  private _isAuthenticated: boolean = false;

  constructor() {
    this._keycloak = new Keycloak({
      url: 'http://192.168.100.248:8443',
      realm: 'comparateur',
      clientId: 'location',
    });
  }

  /**
   * Initialize Keycloak with silent SSO check.
   * @returns `true` if authenticated, `false` otherwise.
   */
  async init(): Promise<boolean> {
    try {
      const authenticated = await this._keycloak.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
        pkceMethod: 'S256',
        checkLoginIframe: false // Improves performance
      });

      this._isAuthenticated = authenticated;

      if (authenticated) {
        await this.loadUserProfile();
      }

      return authenticated;
    } catch (error) {
      console.error('Keycloak initialization error:', error);
      this._isAuthenticated = false;
      return false;
    }
  }

  /**
   * Load user profile from Keycloak and store it.
   */
  private async loadUserProfile(): Promise<void> {
    try {
      const userInfo = await this._keycloak.loadUserInfo() as KeycloakUserInfo;
      const tokenParsed = this._keycloak.tokenParsed;

      this._user = {
        //id: tokenParsed?.sub || '',
        username: userInfo.preferred_username || '',
        email: userInfo.email || '',
        firstName: userInfo.given_name || '',
        lastName: userInfo.family_name || '',
        //role: this.extractRoleFromToken(),
      };
    } catch (error) {
      console.error('Failed to load user profile:', error);
      throw error;
    }
  }

  /**
   * Redirect to Keycloak login page.
   * @param options Optional login parameters (e.g., redirectUri)
   */
  login(options?: Keycloak.KeycloakLoginOptions): void {
    this._keycloak.login(options);
  }

  /**
   * Logout and redirect to application root.
   */
  logout(): void {
    this._keycloak.logout({ redirectUri: window.location.origin });
  }

  /**
   * Get the current access token (refreshes if expired).
   * @returns Current JWT token.
   */
  async getToken(): Promise<string> {
    try {
      if (this._keycloak.isTokenExpired()) {
        await this._keycloak.updateToken(30); // Refresh if expired (30s buffer)
      }
      return this._keycloak.token || '';
    } catch (error) {
      console.error('Failed to refresh token:', error);
      throw error;
    }
  }

  /**
   * Extract the user's role from the JWT token.
   * @returns The first role found, or 'USER' by default.
   */
  private extractRoleFromToken(): string {
    if (!this._keycloak.tokenParsed) return 'USER';
    return this._keycloak.tokenParsed.realm_access?.roles?.[0] || 'USER';
  }

  /**
   * Get the current authenticated user.
   */
  get currentUser(): User | null {
    return this._user;
  }

  /**
   * Check if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  /**
   * Check if the user has a specific role.
   * @param role The role to check.
   */
  hasRole(role: string): boolean {
    if (!this._keycloak.tokenParsed) return false;
    return this._keycloak.tokenParsed.realm_access?.roles?.includes(role) || false;
  }
}
