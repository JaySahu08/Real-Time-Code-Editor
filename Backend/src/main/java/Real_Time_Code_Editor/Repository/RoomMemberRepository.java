package Real_Time_Code_Editor.Repository;

import Real_Time_Code_Editor.room.RoomMember;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface RoomMemberRepository
        extends JpaRepository<RoomMember, Long> {

    boolean existsByRoomIdAndUserId(Long roomId, Long userId);

    Optional<RoomMember> findByRoomIdAndUserId(
            Long roomId,
            Long userId
    );

    List<RoomMember> findAllByRoomId(Long roomId);

    List<RoomMember> findAllByUserId(Long userId);
}