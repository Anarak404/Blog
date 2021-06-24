package pl.anarak.blog.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.anarak.blog.entity.Role;

@Repository
public interface RoleRepository extends CrudRepository<Role, Integer> {
}
