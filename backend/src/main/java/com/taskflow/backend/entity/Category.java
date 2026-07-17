package com.taskflow.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,length = 80)
    private String name;

    @OneToMany(
            mappedBy = "category",
            fetch = FetchType.LAZY
    )
    private List<Task> tasks;

}