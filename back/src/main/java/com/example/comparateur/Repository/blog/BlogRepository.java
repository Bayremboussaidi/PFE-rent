package com.example.comparateur.Repository.blog;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.comparateur.Entity.blog.Blog;

public interface BlogRepository extends JpaRepository<Blog, Long> { }

