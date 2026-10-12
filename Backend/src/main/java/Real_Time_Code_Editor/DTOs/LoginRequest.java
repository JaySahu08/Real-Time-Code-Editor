package Real_Time_Code_Editor.DTOs;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {

    @Email(message = "Invalid email")
    @NotBlank(message = "Email cannot be empty")
    private String gmail;

    @NotBlank(message = "Password cannot be empty")
    private String password;
}