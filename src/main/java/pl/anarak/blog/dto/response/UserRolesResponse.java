package pl.anarak.blog.dto.response;

import lombok.Value;
import pl.anarak.blog.model.UserModel;

import java.util.List;

@Value
public class UserRolesResponse {
    List<UserModel> users;
}
