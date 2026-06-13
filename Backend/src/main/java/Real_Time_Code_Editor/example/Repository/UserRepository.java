package Real_Time_Code_Editor.example.Repository;

import Real_Time_Code_Editor.example.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByGmail(String gmail);
}
