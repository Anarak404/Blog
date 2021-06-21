package pl.anarak.blog.entity;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.sql.Timestamp;

@Entity(name = "post")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column(nullable = false)
    @NonNull
    String title;

    @Column(nullable = false)
    @NonNull
    String content;

    @CreationTimestamp
    Timestamp creationDate;

    Timestamp modificationDate;

    @ManyToOne
    @JoinColumn(name = "creator", nullable = false)
    User creator;

    @ManyToOne
    @JoinColumn(name = "lastModifier", nullable = false)
    User lastModifier;
}
