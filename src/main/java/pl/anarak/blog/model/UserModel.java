package pl.anarak.blog.model;

import lombok.Value;
import pl.anarak.blog.entity.User;

@Value
public class UserModel {
    Integer id;
    String name;
    String role;

    public UserModel(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.role = user.getRole().getName().name();
    }
}
