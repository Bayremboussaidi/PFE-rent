package com.example.comparateur.Service;



import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.comparateur.DTO.AGENCE.AgenceRequestDTO;
import com.example.comparateur.DTO.AGENCE.AgenceResponseDTO;
import com.example.comparateur.DTO.AGENCE.AgenceUpdateDTO;
import com.example.comparateur.Entity.Agence;
import com.example.comparateur.Exception.AgencyAlreadyExistsException;
import com.example.comparateur.Exception.AgencyNotFoundException;
import com.example.comparateur.Repository.AgenceRepository;


@Service
@Transactional
public class AgenceService {

    private final AgenceRepository agenceRepository;
    private final PasswordEncoder passwordEncoder;
    private static final Logger logger = LoggerFactory.getLogger(AgenceService.class);

    @Autowired
    public AgenceService(AgenceRepository agenceRepository, 
                        PasswordEncoder passwordEncoder) {
        this.agenceRepository = agenceRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // CREATE with DTO
    public AgenceResponseDTO createAgence(AgenceRequestDTO agenceDTO) {
        validateNewAgence(agenceDTO);
        
        Agence newAgence = mapToEntity(agenceDTO);
        newAgence.setPassword(passwordEncoder.encode(agenceDTO.getPassword()));
        
        Agence savedAgence = agenceRepository.save(newAgence);
        return mapToDTO(savedAgence);
    }

    // GET ALL with pagination
    public Page<AgenceResponseDTO> getAllAgences(Pageable pageable) {
        return agenceRepository.findAll(pageable)
                .map(this::mapToDTO);
    }

    // GET BY ID
    public AgenceResponseDTO getAgenceById(Long id) {
        return agenceRepository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new AgencyNotFoundException("Agence not found with id: " + id));
    }

    // GET BY AGENCY NAME
    public AgenceResponseDTO getAgenceByAgencyName(String agencyName) {
        return agenceRepository.findByAgencyName(agencyName)
                .map(this::mapToDTO)
                .orElseThrow(() -> new AgencyNotFoundException("Agence not found with name: " + agencyName));
    }

    // UPDATE with partial update
    @Transactional
    public AgenceResponseDTO updateAgence(Long id, AgenceUpdateDTO updateDTO) {
        Agence existingAgence = agenceRepository.findById(id)
                .orElseThrow(() -> new AgencyNotFoundException("Agence not found with id: " + id));

        updateAgenceFields(existingAgence, updateDTO);
        Agence updatedAgence = agenceRepository.save(existingAgence);
        return mapToDTO(updatedAgence);
    }

    // DELETE
    public void deleteAgence(Long id) {
        if (!agenceRepository.existsById(id)) {
            throw new AgencyNotFoundException("Agence not found with id: " + id);
        }
        agenceRepository.deleteById(id);
    }

    // SEARCH
    public Page<AgenceResponseDTO> searchAgencies(String query, Pageable pageable) {
        return agenceRepository.search(query, pageable)
                            .map(this::mapToDTO);
    }

    // Helper methods
    private void validateNewAgence(AgenceRequestDTO dto) {
        if (agenceRepository.existsByEmail(dto.getEmail())) {
            throw new AgencyAlreadyExistsException("Email already registered");
        }
        if (agenceRepository.existsByAgencyName(dto.getAgencyName())) {
            throw new AgencyAlreadyExistsException("Agency name already exists");
        }
    }

    private void updateAgenceFields(Agence agence, AgenceUpdateDTO dto) {
        Optional.ofNullable(dto.getAgencyName())
            .filter(name -> !name.equals(agence.getAgencyName()))
            .ifPresent(name -> {
                if (agenceRepository.existsByAgencyName(name)) {
                    throw new AgencyAlreadyExistsException("New agency name already exists");
                }
                agence.setAgencyName(name);
            });

        Optional.ofNullable(dto.getEmail())
            .filter(email -> !email.equals(agence.getEmail()))
            .ifPresent(email -> {
                if (agenceRepository.existsByEmail(email)) {
                    throw new AgencyAlreadyExistsException("Email already registered");
                }
                agence.setEmail(email);
            });

        Optional.ofNullable(dto.getNewPassword())
            .ifPresent(pwd -> agence.setPassword(passwordEncoder.encode(pwd)));

        Optional.ofNullable(dto.getPhoneNumber()).ifPresent(agence::setPhoneNumber);
        Optional.ofNullable(dto.getCity()).ifPresent(agence::setCity);
        Optional.ofNullable(dto.getPhoto()).ifPresent(agence::setPhoto);
    }

    private AgenceResponseDTO mapToDTO(Agence agence) {
        return new AgenceResponseDTO(
            agence.getId(),
            agence.getAgencyName(),
            agence.getEmail(),
            agence.getPhoneNumber(),
            agence.getCity(),
            agence.getPhoto()
        );
    }

    private Agence mapToEntity(AgenceRequestDTO dto) {
        return new Agence(
            dto.getAgencyName(),
            dto.getEmail(),
            dto.getPhoneNumber(),
            dto.getCity(),
            dto.getPhoto()
        );
    }
















//get agences with details
    public List<AgenceResponseDTO> getAllAgenceDetails() {
    List<Agence> agences = agenceRepository.findAll(); // Fetch all agencies
    // Map each agence entity to AgenceResponseDTO
    return agences.stream()
                  .map(this::mapToDTO)
                  .collect(Collectors.toList());
}
}