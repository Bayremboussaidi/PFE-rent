package com.example.comparateur.Service.blog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.comparateur.Entity.blog.Blog;
import com.example.comparateur.Repository.blog.BlogRepository;

@Service
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;


    public Blog updateBlog(Long id, Blog updatedBlog) {
        Blog existingBlog = blogRepository.findById(id)
                .orElseThrow();

        existingBlog.setTitle(updatedBlog.getTitle());
        existingBlog.setAuthor(updatedBlog.getAuthor());
        existingBlog.setDescription(updatedBlog.getDescription());
        existingBlog.setQuote(updatedBlog.getQuote());
        existingBlog.setImgUrl(updatedBlog.getImgUrl());
        existingBlog.setDate(updatedBlog.getDate());
        existingBlog.setTime(updatedBlog.getTime());

        return blogRepository.save(existingBlog);
    }
}
