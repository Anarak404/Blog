package pl.anarak.blog.service.user;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.anarak.blog.entity.User;
import pl.anarak.blog.model.Role;
import pl.anarak.blog.repository.UserRepository;
import pl.anarak.blog.security.UserDetailsImpl;
import pl.anarak.blog.service.role.RoleService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class UserServiceImpl implements UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final RoleService roleService;

    public UserServiceImpl(PasswordEncoder passwordEncoder, UserRepository userRepository,
                           RoleService roleService) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.roleService = roleService;
    }

    @Override
    public User register(String name, String mail, String password) {
        User user = new User(name, mail, passwordEncoder.encode(password));
        user.setRole(roleService.getRole(Role.USER));
        return userRepository.save(user);
    }

    @Override
    public Optional<User> login(String mail, String password) {
        Optional<User> user = userRepository.findUserByMail(mail);
        return user.map(u -> {
            if (!passwordEncoder.matches(password, u.getPassword())) {
                u = null;
            }
            return u;
        });
    }

    @Override
    public List<User> getAll() {
        return StreamSupport
                .stream(userRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<User> getUser(Integer id) {
        return userRepository.findById(id);
    }

    @Override
    public User getCurrentUser() {
        return ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
    }
}
