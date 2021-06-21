package pl.anarak.blog.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.anarak.blog.entity.Post;

@Repository
public interface PostRepository extends CrudRepository<Post, Integer> {
}
