package Real_Time_Code_Editor.example.Controller;

import Real_Time_Code_Editor.example.DTOs.CreateUserDTOs;
import Real_Time_Code_Editor.example.DTOs.UserDTOs;
import Real_Time_Code_Editor.example.Services.UserServices;
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

}