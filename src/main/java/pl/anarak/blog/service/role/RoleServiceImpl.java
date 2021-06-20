package pl.anarak.blog.service.role;

import org.springframework.stereotype.Service;
import pl.anarak.blog.entity.User;
import pl.anarak.blog.model.Role;

@Service
public class RoleServiceImpl implements RoleService {

    @Override
    public void changeUserRole(User user, Role role) {
        user.setRole(new pl.anarak.blog.entity.Role(role));
    }
}
