package Real_Time_Code_Editor.example.Repository;

import Real_Time_Code_Editor.example.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {

}
