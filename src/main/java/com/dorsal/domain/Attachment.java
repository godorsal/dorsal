package com.dorsal.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Attachment.
 */
@Entity
@Table(name = "attachment")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Attachment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Size(max = 1024)
    @Column(name = "name", length = 1024)
    private String name;

    @Size(max = 1024)
    @Column(name = "url", length = 1024)
    private String url;

    @Lob
    @Column(name = "data_stream")
    private byte[] dataStream;

    @Column(name = "data_stream_content_type")
    private String dataStreamContentType;

    @ManyToOne
    private Supportcase supportcase;

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

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public byte[] getDataStream() {
        return dataStream;
    }

    public void setDataStream(byte[] dataStream) {
        this.dataStream = dataStream;
    }

    public String getDataStreamContentType() {
        return dataStreamContentType;
    }

    public void setDataStreamContentType(String dataStreamContentType) {
        this.dataStreamContentType = dataStreamContentType;
    }

    public Supportcase getSupportcase() {
        return supportcase;
    }

    public void setSupportcase(Supportcase supportcase) {
        this.supportcase = supportcase;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Attachment attachment = (Attachment) o;
        if(attachment.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, attachment.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Attachment{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", url='" + url + "'" +
            ", dataStream='" + dataStream + "'" +
            ", dataStreamContentType='" + dataStreamContentType + "'" +
            '}';
    }
}
