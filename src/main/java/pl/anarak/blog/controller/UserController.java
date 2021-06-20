package pl.anarak.blog.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import pl.anarak.blog.dto.request.LoginRequest;
import pl.anarak.blog.dto.request.RegisterRequest;
import pl.anarak.blog.dto.response.AuthenticationResponse;
import pl.anarak.blog.entity.User;
import pl.anarak.blog.model.UserModel;
import pl.anarak.blog.service.user.UserService;

import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest data) {
        try {
            User user = userService.register(data.getName(), data.getMail(), data.getPassword());

            return new ResponseEntity<>(new AuthenticationResponse(new UserModel(user)),
                    HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User with email already " +
                    "exist!");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginRequest data) {
        Optional<User> user = userService.login(data.getMail(), data.getPassword());
        if (user.isPresent()) {
            return new ResponseEntity<>(new AuthenticationResponse(new UserModel(user.get())),
                    HttpStatus.OK);
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication failed!");
    }
}
