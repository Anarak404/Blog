package pl.anarak.blog.service.post;

import org.springframework.stereotype.Service;
import pl.anarak.blog.entity.Post;
import pl.anarak.blog.entity.User;
import pl.anarak.blog.repository.PostRepository;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }


    @Override
    public List<Post> getPosts() {
        return StreamSupport
                .stream(postRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @Override
    public Post addPost(User user, String title, String content) {
        Post post = new Post(title, content);
        post.setCreator(user);
        return postRepository.save(post);
    }

    @Override
    public void deletePost(Integer id) {
        Optional<Post> post = postRepository.findById(id);
        post.ifPresent(postRepository::delete);
    }

    @Override
    public Post updatePost(User user, Integer id, String title, String content) {
        Optional<Post> post = postRepository.findById(id);
        if (post.isPresent()) {
            Post p = post.get();
            p.setTitle(title);
            p.setContent(content);
            p.setLastModifier(user);
            p.setModificationDate(Timestamp.valueOf(LocalDateTime.now()));
            return postRepository.save(p);
        }
        return null;
    }
}
