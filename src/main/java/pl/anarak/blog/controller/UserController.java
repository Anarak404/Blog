package pl.anarak.blog.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import pl.anarak.blog.dto.request.LoginRequest;
import pl.anarak.blog.dto.request.RegisterRequest;
import pl.anarak.blog.dto.response.AuthenticationResponse;
import pl.anarak.blog.entity.Post;
import pl.anarak.blog.entity.User;
import pl.anarak.blog.model.PostModel;
import pl.anarak.blog.model.UserModel;
import pl.anarak.blog.service.post.PostService;
import pl.anarak.blog.service.user.UserService;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final PostService postService;

    public UserController(UserService userService, PostService postService) {
        this.userService = userService;
        this.postService = postService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@Valid @RequestBody RegisterRequest request) {
        try {
            User user = userService.register(request.getName(), request.getMail(),
                    request.getPassword());

            List<PostModel> p = getPosts();

            return new ResponseEntity<>(new AuthenticationResponse(new UserModel(user), p),
                    HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User with email already " +
                    "exist!");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@Valid @RequestBody LoginRequest request) {
        Optional<User> user = userService.login(request.getMail(), request.getPassword());
        if (user.isPresent()) {
            List<PostModel> p = getPosts();

            return new ResponseEntity<>(new AuthenticationResponse(new UserModel(user.get()), p),
                    HttpStatus.OK);
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication failed!");
    }

    @GetMapping("/admin")
    public ResponseEntity<List<UserModel>> getUsersWithRoles() {
        User me = userService.getCurrentUser();
        List<User> users = userService.getAll();
        List<UserModel> response = users.stream()
                .map(UserModel::new)
                .filter(u -> !u.getId().equals(me.getId()))
                .collect(Collectors.toList());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private List<PostModel> getPosts() {
        List<Post> posts = postService.getPosts();
        return posts.stream()
                .map(PostModel::new)
                .collect(Collectors.toList());
    }
}
