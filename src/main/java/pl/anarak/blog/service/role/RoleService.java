package pl.anarak.blog.service.role;

import pl.anarak.blog.entity.User;
import pl.anarak.blog.model.Role;

public interface RoleService {
    void changeUserRole(User user, Role role);

    pl.anarak.blog.entity.Role getRole(Role role);
}
