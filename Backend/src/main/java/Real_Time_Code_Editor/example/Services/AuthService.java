package Real_Time_Code_Editor.example.Services;

import Real_Time_Code_Editor.example.DTOs.LoginRequest;
import Real_Time_Code_Editor.example.Entity.User;
import Real_Time_Code_Editor.example.Repository.UserRepository;
import Real_Time_Code_Editor.example.Security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public String login(LoginRequest loginRequest) {

        User user = userRepository
                .findByGmail(loginRequest.getGmail())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        boolean passwordMatches =
                passwordEncoder.matches(
                        loginRequest.getPassword(),
                        user.getPassword()
                );

        if (!passwordMatches) {
            throw new RuntimeException("Invalid password");
        }

        return jwtService.generateToken(user.getGmail());
    }
}