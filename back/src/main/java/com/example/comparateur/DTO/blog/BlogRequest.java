package com.example.comparateur.DTO.blog;

public class BlogRequest {
    private String title;
    private String imgUrl;
    private String author;
    private String date;
    private String time;
    private String description;
    private String quote;

    // Constructors
    public BlogRequest() {
    }

    public BlogRequest(String title, String imgUrl, String author, String date, String time, String description, String quote) {
        this.title = title;
        this.imgUrl = imgUrl;
        this.author = author;
        this.date = date;
        this.time = time;
        this.description = description;
        this.quote = quote;
    }

    // Getters and Setters

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getQuote() {
        return quote;
    }

    public void setQuote(String quote) {
        this.quote = quote;
    }
}
