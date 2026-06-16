package Real_Time_Code_Editor.example.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString
public class User{
    @Id
    private String gmail;
    private String name;
    private String password;
    private List<String> friends;
}
