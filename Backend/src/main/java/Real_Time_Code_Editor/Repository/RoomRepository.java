package Real_Time_Code_Editor.Repository;

import Real_Time_Code_Editor.Entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long> {

    Optional<Room> findByInviteCode(String inviteCode);

    boolean existsByInviteCode(String inviteCode);
}