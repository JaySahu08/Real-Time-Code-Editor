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

    public UserServices(UserRepository userRepository,
                        PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // CREATE USER
    public UserDTOs saveUser(CreateUserDTOs dto) {

        // Check if email already exists
        ensureEmailIsAvailable(dto.getGmail(), 0L);

        User user = new User();

        user.setName(dto.getName());
        user.setGmail(dto.getGmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        userRepository.save(user);

        return toDto(user);
    }

    // GET ALL USERS
    public List<UserDTOs> getUser() {

        return userRepository.findAll()
                .stream()
                .map(this::toDto)
                .toList();
    }

    // CHECK EMAIL AVAILABILITY
    private void ensureEmailIsAvailable(String email, long currentUserId) {

        userRepository.findByGmail(email)
                .filter(existingUser ->
                        existingUser.getId() != currentUserId
                )
                .ifPresent(existingUser -> {
                    throw new IllegalStateException(
                            "Email is already in use"
                    );
                });
    }

    // GET USER BY ID
    public UserDTOs getUser(String id) throws Exception {

        return toDto(getExistingUser(id));
    }

    // GET EXISTING USER
    public User getExistingUser(String id) throws Exception {

        long userId;

        try {
            userId = Long.parseLong(id);
        } catch (NumberFormatException e) {
            throw new Exception("Invalid user id: " + id);
        }

        return userRepository.findById(userId)
                .orElseThrow(() ->
                        new Exception(
                                "User not found with id " + id
                        )
                );
    }

    // CONVERT ENTITY TO DTO
    public UserDTOs toDto(User user) {

        UserDTOs userDTOs = new UserDTOs();

        userDTOs.setName(user.getName());
        userDTOs.setGmail(user.getGmail());

        return userDTOs;
    }
}