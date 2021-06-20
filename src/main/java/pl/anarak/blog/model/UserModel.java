package pl.anarak.blog.model;

import lombok.Value;
import pl.anarak.blog.entity.User;

@Value
public class UserModel {
    String name;
    String role;

    public UserModel(User user) {
        this.name = user.getName();
        this.role = user.getRole().getName().name();
    }
}
