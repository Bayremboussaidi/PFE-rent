package com.example.comparateur.DTO;

import java.util.Base64;

import com.example.comparateur.Entity.Photo;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PhotoResponseDTO {
    private Long id;
    private String name;
    private String type;
    private String base64Data;

    // 1️⃣ Added null-safe initialization for all fields
    public PhotoResponseDTO(Photo photo) {
        if (photo != null) {
            this.id = photo.getId();
            this.name = photo.getName() != null ? photo.getName() : "unnamed";
            this.type = photo.getType() != null ? photo.getType() : "application/octet-stream";
            this.base64Data = convertToBase64(photo.getData());
        }
    }

    // 2️⃣ Fixed Base64 encoding error handling
    private String convertToBase64(byte[] data) {
        try {
            if (data == null || data.length == 0) return "";
            return Base64.getEncoder().encodeToString(data);
        } catch (Exception e) {
            return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNDUiIHN0cm9rZT0iI2NjYyIgc3Ryb2tlLXdpZHRoPSIxMCIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4="; // Error placeholder
        }
    }

    // 3️⃣ Added explicit JSON property for frontend compatibility
    public String getImageSrc() {
        if (base64Data == null || base64Data.isEmpty()) return "";
        return "data:" + type + ";base64," + base64Data;
    }
}