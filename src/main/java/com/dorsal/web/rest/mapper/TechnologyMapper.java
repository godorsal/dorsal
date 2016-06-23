package com.dorsal.web.rest.mapper;

import com.dorsal.domain.*;
import com.dorsal.web.rest.dto.TechnologyDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Technology and its DTO TechnologyDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TechnologyMapper {

    TechnologyDTO technologyToTechnologyDTO(Technology technology);

    List<TechnologyDTO> technologiesToTechnologyDTOs(List<Technology> technologies);

    @Mapping(target = "technologies", ignore = true)
    @Mapping(target = "referencedocs", ignore = true)
    @Mapping(target = "supportcases", ignore = true)
    @Mapping(target = "casetechnologyproperties", ignore = true)
    Technology technologyDTOToTechnology(TechnologyDTO technologyDTO);

    List<Technology> technologyDTOsToTechnologies(List<TechnologyDTO> technologyDTOs);
}
