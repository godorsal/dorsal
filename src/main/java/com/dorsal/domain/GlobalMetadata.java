package com.dorsal.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

import com.dorsal.domain.enumeration.Metadatatypeenum;

/**
 * A GlobalMetadata.
 */
@Entity
@Table(name = "global_metadata")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GlobalMetadata implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "value")
    private String value;

    @Enumerated(EnumType.STRING)
    @Column(name = "value_type")
    private Metadatatypeenum valueType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Metadatatypeenum getValueType() {
        return valueType;
    }

    public void setValueType(Metadatatypeenum valueType) {
        this.valueType = valueType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        GlobalMetadata globalMetadata = (GlobalMetadata) o;
        if(globalMetadata.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, globalMetadata.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "GlobalMetadata{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", value='" + value + "'" +
            ", valueType='" + valueType + "'" +
            '}';
    }
}
