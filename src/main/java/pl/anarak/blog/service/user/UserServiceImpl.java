package pl.anarak.blog.service.user;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.anarak.blog.entity.Role;
import pl.anarak.blog.entity.User;
import pl.anarak.blog.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class UserServiceImpl implements UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public UserServiceImpl(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @Override
    public User register(String name, String mail, String password) {
        User user = new User(name, mail, passwordEncoder.encode(password));
        user.setRole(new Role(pl.anarak.blog.model.Role.USER));
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
}
