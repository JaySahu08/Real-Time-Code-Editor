package Real_Time_Code_Editor.example.DTOs;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
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


    @NotBlank(message = "Password cannot be empty")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;

}
