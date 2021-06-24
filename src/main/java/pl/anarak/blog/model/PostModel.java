package pl.anarak.blog.model;

import lombok.Value;
import pl.anarak.blog.entity.Post;

import java.sql.Timestamp;

@Value
public class PostModel {
    Integer id;
    String title;
    String content;
    UserModel creator;
    UserModel lastModifier;
    Timestamp creationDate;
    Timestamp modificationDate;

    public PostModel(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.creator = new UserModel(post.getCreator());
        this.lastModifier = new UserModel(post.getLastModifier());
        this.creationDate = post.getCreationDate();
        this.modificationDate = post.getModificationDate();
    }
}
