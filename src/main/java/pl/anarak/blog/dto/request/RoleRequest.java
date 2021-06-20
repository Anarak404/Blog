package pl.anarak.blog.dto.request;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import pl.anarak.blog.model.Role;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoleRequest {
    int id;
    Role role;
}
