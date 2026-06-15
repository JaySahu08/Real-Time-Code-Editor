package Real_Time_Code_Editor.example.Services;

import Real_Time_Code_Editor.example.DTOs.CreateUserDTOs;
import Real_Time_Code_Editor.example.DTOs.UserDTOs;
import Real_Time_Code_Editor.example.Entity.User;
import Real_Time_Code_Editor.example.Repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.swing.*;

@Service
public class UserServices {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServices(UserRepository user , PasswordEncoder passwordEncoder){
        this.userRepository = user;
        this.passwordEncoder = passwordEncoder;
    }

    public UserDTOs saveUser(CreateUserDTOs dto){
        if()
    }

    private void ensureEmailIsAvailable(String email , String currentUserId){
        userRepository.findByEmail(email)
                .filter(existingUser -> !existingUser.getGmail().equals(currentUserId))
                .ifPresent(existingUser -> {
                    throw new IllegalStateException("Email is already in use");
                });

    }

    public UserDTOs toDto(User user){
        UserDTOs userDTOs = new UserDTOs();
        userDTOs.setName(user.getName());
        userDTOs.setGmail(user.getGmail());
        return userDTOs;
    }

}
