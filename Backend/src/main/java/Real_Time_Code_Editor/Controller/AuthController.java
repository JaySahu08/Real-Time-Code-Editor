package Real_Time_Code_Editor.Controller;

import Real_Time_Code_Editor.DTOs.LoginRequest;
import Real_Time_Code_Editor.Services.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public String login(
            @Valid @RequestBody LoginRequest request) {

        return authService.login(request);
    }
}