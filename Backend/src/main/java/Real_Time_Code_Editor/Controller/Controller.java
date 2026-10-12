package Real_Time_Code_Editor.Controller;

import Real_Time_Code_Editor.DTOs.CreateUserDTOs;
import Real_Time_Code_Editor.DTOs.UserDTOs;
import Real_Time_Code_Editor.Services.UserServices;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class Controller {
    private UserServices userServices;

    public Controller(UserServices userServices) {
        this.userServices = userServices;
    }

    @GetMapping("/users")
    public List<UserDTOs> getUsers(){
        return userServices.getUser();
    }

    @PostMapping("/create")
    public void createUser(@RequestBody CreateUserDTOs userDTOs){

        UserDTOs userDTO = userServices.saveUser(userDTOs);
        return;
    }

    @GetMapping("/user/{id}")
    public UserDTOs getById(@PathVariable String mail){
        return userServices.getUserByMail(mail);
    }

    @GetMapping("/me")
    public UserDTOs getCurrentUser(
            Authentication authentication) {

        String gmail = authentication.getName();

        return userServices.getUserByMail(gmail);
    }

}