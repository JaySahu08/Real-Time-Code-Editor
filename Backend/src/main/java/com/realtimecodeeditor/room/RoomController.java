
package Real_Time_Code_Editor.room;

import Real_Time_Code_Editor.room.dto.CreateRoomRequest;
import Real_Time_Code_Editor.room.dto.RoomResponse;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RoomResponse createRoom(
            @Valid @RequestBody CreateRoomRequest request) {

        return roomService.createRoom(request);
    }
}
