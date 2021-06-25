package pl.anarak.blog.entity;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "app_user")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column(nullable = false)
    @NonNull
    String name;

    @Column(nullable = false, unique = true)
    @NonNull
    String mail;

    @Column(nullable = false)
    @NonNull
    String password;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "role", nullable = false)
    Role role;

    @OneToMany(mappedBy = "creator")
    List<Post> createdPosts = new ArrayList<>();

    @OneToMany(mappedBy = "lastModifier")
    List<Post> modifiedPosts = new ArrayList<>();
}
