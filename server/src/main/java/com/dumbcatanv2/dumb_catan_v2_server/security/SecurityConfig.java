package com.dumbcatanv2.dumb_catan_v2_server.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

/*Root of the security setup*/
/*makes use of JwtAuthFilter and UserDetailsServiceImpl to configure the security details*/
@Configuration
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final UserDetailsServiceImpl userDetailsService;

    /*this constructor is called by spring security on your behalf*/
    /*JwtAuthFilter and UserDetailsService are both marked with the @Component annotation allowing them to be instantiated
    * and passed as arguments by spring boot on your behalf*/
    /*NOTE: we use UserDetailsService even though we have a custom one - the custom one is marked with the @Service annotation
    * and so spring boot will automatically inject that one here*/
    public SecurityConfig(JwtAuthFilter jwtAuthFilter, UserDetailsServiceImpl userDetailsService) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.userDetailsService = userDetailsService;
    }

    /*@Bean registers the method's return value (SecurityFilterChain) as a Spring-managed bean
    -> Spring Boot will use this to configure HTTP security*/
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                /*Enables cors with my cors configuration source bean defined below*/
                .cors(withDefaults())
                /*Disables CSRF (Cross Site Request Forgery) protection, which is safe only if you're doing stateless JWT-based APIs (i.e., no cookies or sessions)*/
                .csrf(csrf -> csrf.disable())
                /*This section sets URL-based authorization rules*/
                /* -> Requests that match /api/auth/** (like /api/auth/signin) are open to everyone*/
                /* -> All other requests require authentication — including /api/game, /api/user, etc. - controlled by the .anyRequest().authenticated() line*/
                /*NOTE: this means that all other requests from the frontend must include the jwt in the header*/
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/dumb-catan-ws/**").permitAll()
                        .anyRequest().authenticated()
                )
                /*tells spring security not to use sessions - instead client includes jwt in every request - no session data is stored by spring therefore*/
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                /*injects your custom JWT filter (JwtAuthFilter) into Spring’s filter chain.*/
                /* -> It runs before the built-in username/password filter, which ensures your JWT is processed early.*/
                /* -> This lets you authenticate via token rather than username/password on every request.*/
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                /*builds the security filter chain and registers it*/
                .build();
    }

    /*CORS configuration - necessary to avoid cors errors since client origin is not the same as the server origin*/
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:3000"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true); // lets you send cookies or Authorization headers

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        /*Applies the CORS settings in config to all incoming HTTP requests, regardless of their path*/
        source.registerCorsConfiguration("/**", config);

        return source;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /*defines how Spring Security authenticates users using your database (via UserDetailsService) and a password encoder (like BCrypt)*/
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        /*"DAO" is a built-in Spring class and means "Data Access Object" — it uses your UserDetailsService to fetch user info from your database*/
        /* -> This is the default way Spring Security handles username/password authentication with custom users*/
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        /*tells the authentication provider to use your UserDetailsService implementation (CustomUserDetailsService) to load user data by username during login*/
        /* -> this is how Spring finds your user in the database when someone logs in*/
        provider.setUserDetailsService(userDetailsService);
        /*tells Spring how to verify the password*/
        /* -> in this case it compares the hashed password from the database against the raw password from the login request using a PasswordEncoder*/
        provider.setPasswordEncoder(passwordEncoder());
        /*registers this DaoAuthenticationProvider as a Spring bean, so it can be injected into the security system - AuthenticationManager*/
        return provider;
    }

    /*returns an AuthenticationManager which allows spring security to manage authentication on the basis of the above configuration details*/
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
            throws Exception {
        return config.getAuthenticationManager();
    }
}