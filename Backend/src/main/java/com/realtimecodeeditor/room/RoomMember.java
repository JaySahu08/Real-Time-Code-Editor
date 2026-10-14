package Real_Time_Code_Editor.room;

import Real_Time_Code_Editor.room.Room;
import Real_Time_Code_Editor.user.User;
import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(
        name = "room_members",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_room_member",
                        columnNames = {"room_id", "user_id"}
                )
        }
)
public class RoomMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private RoomRole role;

    @Column(nullable = false, updatable = false)
    private Instant joinedAt;

    protected RoomMember() {
        // Required by JPA
    }

    public RoomMember(Room room, User user, RoomRole role) {
        this.room = room;
        this.user = user;
        this.role = role;
    }

    @PrePersist
    protected void onCreate() {
        joinedAt = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public Room getRoom() {
        return room;
    }

    public User getUser() {
        return user;
    }

    public RoomRole getRole() {
        return role;
    }

    public Instant getJoinedAt() {
        return joinedAt;
    }

    public void changeRole(RoomRole role) {
        this.role = role;
    }
}
