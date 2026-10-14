package Real_Time_Code_Editor.room.dto;

import Real_Time_Code_Editor.room.RoomRole;
import java.time.Instant;

public record RoomResponse(
        Long id,
        String name,
        String description,
        String inviteCode,
        RoomRole role,
        Instant createdAt
) {}