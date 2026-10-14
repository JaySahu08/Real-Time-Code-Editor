package Real_Time_Code_Editor.room.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateRoomRequest(

        @NotBlank(message = "Room name is required")
        @Size(max = 100, message = "Room name cannot exceed 100 characters")
        String name,

        @Size(max = 500, message = "Description cannot exceed 500 characters")
        String description

) {}
