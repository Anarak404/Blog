package pl.anarak.blog.dto.response;

import lombok.Value;
import pl.anarak.blog.model.PostModel;
import pl.anarak.blog.model.UserModel;

import java.util.List;

@Value
public class AuthenticationResponse {
    UserModel user;
    List<PostModel> posts;
}
