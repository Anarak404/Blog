package pl.anarak.blog.dto.request;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import pl.anarak.blog.model.Role;

import javax.validation.constraints.NotBlank;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoleRequest {

    @NotBlank
    int id;

    Role role;
}
