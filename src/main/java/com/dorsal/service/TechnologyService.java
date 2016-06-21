package com.dorsal.service;

import com.dorsal.domain.Technology;
import com.dorsal.repository.TechnologyRepository;
import com.dorsal.web.rest.dto.TechnologyDTO;
import com.dorsal.web.rest.mapper.TechnologyMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Technology.
 */
@Service
@Transactional
public class TechnologyService {

    private final Logger log = LoggerFactory.getLogger(TechnologyService.class);
    
    @Inject
    private TechnologyRepository technologyRepository;
    
    @Inject
    private TechnologyMapper technologyMapper;
    
    /**
     * Save a technology.
     * 
     * @param technologyDTO the entity to save
     * @return the persisted entity
     */
    public TechnologyDTO save(TechnologyDTO technologyDTO) {
        log.debug("Request to save Technology : {}", technologyDTO);
        Technology technology = technologyMapper.technologyDTOToTechnology(technologyDTO);
        technology = technologyRepository.save(technology);
        TechnologyDTO result = technologyMapper.technologyToTechnologyDTO(technology);
        return result;
    }

    /**
     *  Get all the technologies.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<TechnologyDTO> findAll() {
        log.debug("Request to get all Technologies");
        List<TechnologyDTO> result = technologyRepository.findAll().stream()
            .map(technologyMapper::technologyToTechnologyDTO)
            .collect(Collectors.toCollection(LinkedList::new));
        return result;
    }

    /**
     *  Get one technology by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public TechnologyDTO findOne(Long id) {
        log.debug("Request to get Technology : {}", id);
        Technology technology = technologyRepository.findOne(id);
        TechnologyDTO technologyDTO = technologyMapper.technologyToTechnologyDTO(technology);
        return technologyDTO;
    }

    /**
     *  Delete the  technology by id.
     *  
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Technology : {}", id);
        technologyRepository.delete(id);
    }
}
