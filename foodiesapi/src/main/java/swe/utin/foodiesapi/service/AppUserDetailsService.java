package swe.utin.foodiesapi.service;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import swe.utin.foodiesapi.Entity.UserEntity;
import swe.utin.foodiesapi.repository.UserRepository;

import java.util.ArrayList;
import java.util.Collections;

@Service
@AllArgsConstructor
public class AppUserDetailsService implements  UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException{
        UserEntity existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Email Not found for the email: "+email));
        return new User(existingUser.getEmail(), existingUser.getPassword(), Collections.emptyList());
    }

}
