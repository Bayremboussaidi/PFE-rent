package com.example.comparateur.Controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.comparateur.Entity.Follower;
import com.example.comparateur.Service.FollowerService;

@RestController
@RequestMapping("/followers")
@CrossOrigin(origins = "http://localhost:4200")
public class FollowerController {

    @Autowired
    private FollowerService followerService;

    @GetMapping
    public List<Follower> getAllFollowers() {
        return followerService.getAllFollowers();
    }

    @PostMapping
    public Follower addFollower(@RequestBody Follower follower) {
        return followerService.addFollower(follower);
    }

    @DeleteMapping("/{id}")
    public void deleteFollower(@PathVariable Long id) {
        followerService.deleteFollower(id);
    }
}