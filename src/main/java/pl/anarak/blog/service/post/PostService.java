package pl.anarak.blog.service.post;

import pl.anarak.blog.entity.Post;
import pl.anarak.blog.entity.User;

import java.util.List;

public interface PostService {
    List<Post> getPosts();

    Post addPost(User user, String title, String content);

    void deletePost(Integer id);

    Post updatePost(User user, Integer id, String title, String content);
}
