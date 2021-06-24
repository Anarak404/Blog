package pl.anarak.blog.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import pl.anarak.blog.dto.request.PostRequest;
import pl.anarak.blog.dto.response.ResultResponse;
import pl.anarak.blog.entity.Post;
import pl.anarak.blog.entity.User;
import pl.anarak.blog.model.PostModel;
import pl.anarak.blog.service.post.PostService;
import pl.anarak.blog.service.user.UserService;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/post")
public class PostController {

    private final PostService postService;
    private final UserService userService;

    public PostController(PostService postService, UserService userService) {
        this.postService = postService;
        this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<PostModel>> getPosts() {
        List<Post> posts = postService.getPosts();
        List<PostModel> response = posts.stream()
                .map(PostModel::new)
                .collect(Collectors.toList());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostModel> getPost(@PathVariable Integer id) {
        Optional<Post> post = postService.getPost(id);
        if (post.isPresent()) {
            return new ResponseEntity<>(new PostModel(post.get()), HttpStatus.OK);
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Post does not exist!");
    }

    @PostMapping("/add")
    public ResponseEntity<PostModel> createPost(@Valid @RequestBody PostRequest request) {
        User me = userService.getCurrentUser();
        Post post = postService.addPost(me, request.getTitle(), request.getContent());
        return new ResponseEntity<>(new PostModel(post), HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResultResponse> deletePost(@PathVariable Integer id) {
        postService.deletePost(id);
        return new ResponseEntity<>(new ResultResponse(true), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<PostModel> updatePost(@Valid @RequestBody PostRequest request,
                                                @PathVariable Integer id) {
        User me = userService.getCurrentUser();
        Post post = postService.updatePost(me, id, request.getTitle(), request.getContent());
        if (post != null) {
            return new ResponseEntity<>(new PostModel(post), HttpStatus.OK);
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Post does not exist!");
    }
}
