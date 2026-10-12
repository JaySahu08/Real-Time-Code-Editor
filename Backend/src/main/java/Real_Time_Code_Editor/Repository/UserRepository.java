package Real_Time_Code_Editor.Repository;

import Real_Time_Code_Editor.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByGmail(String gmail);
}