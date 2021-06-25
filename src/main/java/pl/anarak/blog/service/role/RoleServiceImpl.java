package pl.anarak.blog.service.role;

import org.springframework.stereotype.Service;
import pl.anarak.blog.entity.User;
import pl.anarak.blog.model.Role;
import pl.anarak.blog.repository.RoleRepository;
import pl.anarak.blog.repository.UserRepository;

import java.util.HashMap;
import java.util.Map;

@Service
public class RoleServiceImpl implements RoleService {

    private final Map<Role, pl.anarak.blog.entity.Role> roles = new HashMap<>();
    private final UserRepository userRepository;

    public RoleServiceImpl(RoleRepository roleRepository, UserRepository userRepository) {
        this.userRepository = userRepository;
        roleRepository.findAll().forEach(x -> roles.put(x.getName(), x));
    }

    @Override
    public void changeUserRole(User user, Role role) {
        user.setRole(roles.get(role));
        userRepository.save(user);
    }

    @Override
    public pl.anarak.blog.entity.Role getRole(Role role) {
        return roles.get(role);
    }
}
