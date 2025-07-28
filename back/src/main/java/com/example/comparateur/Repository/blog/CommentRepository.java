package com.example.comparateur.Repository.blog;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.comparateur.Entity.blog.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> { }

