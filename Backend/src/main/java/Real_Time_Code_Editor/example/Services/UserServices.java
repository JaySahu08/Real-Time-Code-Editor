package Real_Time_Code_Editor.example.Services;

import Real_Time_Code_Editor.example.DTOs.RegisterDTOs;
import Real_Time_Code_Editor.example.Repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServices {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServices(UserRepository user , PasswordEncoder passwordEncoder){
        this.userRepository = user;
        this.passwordEncoder = passwordEncoder;
    }

    public UserDTO saveUser(RegisterDTOs registerDTOs){

    }

    private void ensureEmailIsAvailable(String email , Long currentUserId){
        userRepository.findByEmail(email){
//wead
        }
    }




}
