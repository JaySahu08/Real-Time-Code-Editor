package Real_Time_Code_Editor.example.Services;

import Real_Time_Code_Editor.example.DTOs.CreateUserDTOs;
import Real_Time_Code_Editor.example.DTOs.UserDTOs;
import Real_Time_Code_Editor.example.Entity.User;
import Real_Time_Code_Editor.example.Repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServices {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServices(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserDTOs saveUser(CreateUserDTOs dto) {

        ensureEmailIsAvailable(dto.getGmail());

        User user = new User();

        user.setName(dto.getName());
        user.setGmail(dto.getGmail());

        // Never store the plain password
        user.setPassword(
                passwordEncoder.encode(dto.getPassword())
        );

        userRepository.save(user);

        return toDto(user);
    }

    public List<UserDTOs> getUser() {

        return userRepository.findAll()
                .stream()
                .map(this::toDto)
                .toList();
    }

    public UserDTOs getUserByMail(String gmail) {

        return userRepository.findByGmail(gmail)
                .map(this::toDto)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );
    }

    public User getExistingUser(Long id) {

        return userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found with id " + id
                        )
                );
    }

    private void ensureEmailIsAvailable(String gmail) {

        if (userRepository.findByGmail(gmail).isPresent()) {

            throw new IllegalStateException(
                    "Email is already in use"
            );
        }
    }

    public UserDTOs toDto(User user) {

        UserDTOs dto = new UserDTOs();

        dto.setName(user.getName());
        dto.setGmail(user.getGmail());

        return dto;
    }
}