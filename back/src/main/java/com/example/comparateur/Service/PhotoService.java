
package com.example.comparateur.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.comparateur.DTO.PhotoResponseDTO;
import com.example.comparateur.Entity.Photo;
import com.example.comparateur.Entity.Voiture;
import com.example.comparateur.Repository.PhotoRepository;
import com.example.comparateur.Repository.VoitureRepository;

@Service
public class PhotoService {

    @Autowired
    private PhotoRepository photoRepository;

    @Autowired
    private VoitureRepository voitureRepository;

    // ✅ Store images as byte[] and return as Base64
    @Transactional
    public List<PhotoResponseDTO> saveMultiplePhotos(Long voitureId, MultipartFile[] files) throws IOException {
        Voiture voiture = voitureRepository.findById(voitureId)
                .orElseThrow(() -> new RuntimeException("Voiture not found with id: " + voitureId));

        List<Photo> photos = List.of(files).stream().map(file -> {
            try {
                Photo photo = new Photo();
                photo.setName(file.getOriginalFilename());
                photo.setType(file.getContentType());
                photo.setData(file.getBytes());  // ✅ Store image as `byte[]`
                photo.setVoiture(voiture);
                return photoRepository.save(photo);
            } catch (IOException e) {
                throw new RuntimeException("Error saving image: " + e.getMessage());
            }
        }).collect(Collectors.toList());

        return photos.stream().map(PhotoResponseDTO::new).collect(Collectors.toList());
    }

    // ✅ Ensure Base64 encoding when retrieving images
    public List<PhotoResponseDTO> getPhotosByVoitureId(Long voitureId) {
        return photoRepository.findAllByVoitureId(voitureId)
                .stream()
                .map(PhotoResponseDTO::new)
                .collect(Collectors.toList());
    }

    // ✅ Delete photos correctly
    public void deletePhotosByVoitureId(Long voitureId) {
        photoRepository.deleteByVoitureId(voitureId);
    }
}
