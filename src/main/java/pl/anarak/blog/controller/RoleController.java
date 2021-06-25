package pl.anarak.blog.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import pl.anarak.blog.dto.request.RoleRequest;
import pl.anarak.blog.entity.User;
import pl.anarak.blog.model.UserModel;
import pl.anarak.blog.service.role.RoleService;
import pl.anarak.blog.service.user.UserService;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/role")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class RoleController {

    private final UserService userService;
    private final RoleService roleService;

    public RoleController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @PutMapping("")
    public ResponseEntity<UserModel> changeRole(@Valid @RequestBody RoleRequest request) {
        Optional<User> u = userService.getUser(request.getId());
        if (u.isPresent()) {
            roleService.changeUserRole(u.get(), request.getRole());
            return new ResponseEntity<>(new UserModel(u.get()), HttpStatus.OK);
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User does not exist!");
    }
}
