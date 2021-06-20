package pl.anarak.blog.service.user;

import pl.anarak.blog.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User register(String name, String mail, String password);

    Optional<User> login(String mail, String password);

    List<User> getAll();
}
