package pl.anarak.blog.service.post;

import pl.anarak.blog.entity.Post;
import pl.anarak.blog.entity.User;

import java.util.List;
import java.util.Optional;

public interface PostService {
    List<Post> getPosts();

    Optional<Post> getPost(Integer id);

    Post addPost(User user, String title, String content);

    void deletePost(Integer id);

    Post updatePost(User user, Integer id, String title, String content);
}
