package Real_Time_Code_Editor.example.DTOs;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDTOs {

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email cannot be empty")
    private String gmail;

    @NotBlank(message = "Name cannot be empty")
    private String name;
}