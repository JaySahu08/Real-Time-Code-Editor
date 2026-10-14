
package Real_Time_Code_Editor.room;

import Real_Time_Code_Editor.user.User;
import Real_Time_Code_Editor.user.UserRepository;
import Real_Time_Code_Editor.room.dto.CreateRoomRequest;
import Real_Time_Code_Editor.room.dto.RoomResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;

@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final RoomMemberRepository roomMemberRepository;
    private final UserRepository userRepository;

    private static final String CHARACTERS =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    private static final SecureRandom RANDOM = new SecureRandom();

    public RoomService(
            RoomRepository roomRepository,
            RoomMemberRepository roomMemberRepository,
            UserRepository userRepository) {

        this.roomRepository = roomRepository;
        this.roomMemberRepository = roomMemberRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public RoomResponse createRoom(CreateRoomRequest request) {

        // Get the authenticated user's identity from Spring Security
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null
                || !authentication.isAuthenticated()
                || authentication.getName() == null) {
            throw new IllegalStateException("User is not authenticated");
        }

        String gmail = authentication.getName();

        // Find the user associated with the JWT
        User user = userRepository.findByGmail(gmail)
                .orElseThrow(() ->
                        new IllegalStateException(
                                "Authenticated user not found"));

        // Generate a unique invitation code
        String inviteCode;

        do {
            inviteCode = generateInviteCode();
        } while (roomRepository.existsByInviteCode(inviteCode));

        // Create the room
        Room room = new Room(
                request.name(),
                request.description(),
                inviteCode
        );

        Room savedRoom = roomRepository.save(room);

        // Automatically make the creator the room owner
        RoomMember membership = new RoomMember(
                savedRoom,
                user,
                RoomRole.OWNER
        );

        roomMemberRepository.save(membership);

        // Return the response DTO
        return new RoomResponse(
                savedRoom.getId(),
                savedRoom.getName(),
                savedRoom.getDescription(),
                savedRoom.getInviteCode(),
                RoomRole.OWNER,
                savedRoom.getCreatedAt()
        );
    }

    private String generateInviteCode() {

        StringBuilder code = new StringBuilder(10);

        for (int i = 0; i < 10; i++) {
            int index = RANDOM.nextInt(CHARACTERS.length());
            code.append(CHARACTERS.charAt(index));
        }

        return code.toString();
    }
}
