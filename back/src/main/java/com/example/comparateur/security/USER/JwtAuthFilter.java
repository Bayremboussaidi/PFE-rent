package com.example.comparateur.security.USER;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;  // Correct import for Jakarta EE
import org.springframework.security.core.context.SecurityContextHolder;  // Correct import for Jakarta EE
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    // Qualify the UserDetailsService explicitly for each use case
    @Qualifier("customAdminDetailsService") 
    private final UserDetailsService customAdminDetailsService;

    @Qualifier("customUserDetailsService") 
    private final UserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;
        UserDetailsService userDetailsServiceToUse;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);  // Continue if the header is missing
            return;
        }

        // Extract JWT token
        jwt = authHeader.substring(7);
        userEmail = jwtUtil.extractUsername(jwt);

        // Add logic here to determine which UserDetailsService to use, for example:
        if (userEmail != null && userEmail.endsWith("@admin.com")) {
            userDetailsServiceToUse = customAdminDetailsService; // Use the admin service
        } else {
            userDetailsServiceToUse = customUserDetailsService; // Use the regular user service
        }

        // If valid token and user not authenticated, set the authentication in SecurityContext
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsServiceToUse.loadUserByUsername(userEmail);
            if (jwtUtil.validateToken(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}
