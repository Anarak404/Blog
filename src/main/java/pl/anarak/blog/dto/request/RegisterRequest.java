package pl.anarak.blog.dto.request;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RegisterRequest {

    @NotBlank
    @Size(min = 3)
    String name;

    @Email
    String mail;

    @NotBlank
    @Size(min = 8)
    String password;
}
