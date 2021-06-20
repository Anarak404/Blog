package pl.anarak.blog.dto.response;

import lombok.Value;
import pl.anarak.blog.model.UserModel;

@Value
public class AuthenticationResponse {
    UserModel user;
}
