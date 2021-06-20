package pl.anarak.blog.model;

import lombok.Value;
import pl.anarak.blog.entity.User;

@Value
public class UserModel {
    String name;

    public UserModel(User user) {
        this.name = user.getName();
    }
}
