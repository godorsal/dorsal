package com.dorsal.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Supportcase.
 */
@Entity
@Table(name = "supportcase")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Supportcase implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Size(max = 1024)
    @Column(name = "summary", length = 1024)
    private String summary;

    @Size(max = 1024)
    @Column(name = "expected_result", length = 1024)
    private String expectedResult;

    @Column(name = "status_msg")
    private String statusMsg;

    @Column(name = "date_created")
    private ZonedDateTime dateCreated;

    @Column(name = "date_last_update")
    private ZonedDateTime dateLastUpdate;

    @Size(max = 1024)
    @Column(name = "chat_url", length = 1024)
    private String chatUrl;

    @Column(name = "eta_completion")
    private String etaCompletion;

    @Column(name = "estimate_hours")
    private Integer estimateHours;

    @Size(max = 2048)
    @Column(name = "estimate_comment", length = 2048)
    private String estimateComment;

    @Column(name = "is_approved")
    private Boolean isApproved;

    @Column(name = "time_on_case")
    private Integer timeOnCase;

    @Size(max = 4096)
    @Column(name = "estimate_log", length = 4096)
    private String estimateLog;

    @Column(name = "is_resolved")
    private Boolean isResolved;

    @Column(name = "is_rated")
    private Boolean isRated;

    @Column(name = "expected_completion_date")
    private ZonedDateTime expectedCompletionDate;

    @Column(name = "expert_message")
    private String expertMessage;

    @Column(name = "number_of_updates")
    private Integer numberOfUpdates;

    @ManyToOne
    private User user;

    @ManyToOne
    private ExpertAccount expertaccount;

    @ManyToOne
    private Technology technology;

    @ManyToOne
    private Status status;

    @ManyToOne
    private Issue issue;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getExpectedResult() {
        return expectedResult;
    }

    public void setExpectedResult(String expectedResult) {
        this.expectedResult = expectedResult;
    }

    public String getStatusMsg() {
        return statusMsg;
    }

    public void setStatusMsg(String statusMsg) {
        this.statusMsg = statusMsg;
    }

    public ZonedDateTime getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(ZonedDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public ZonedDateTime getDateLastUpdate() {
        return dateLastUpdate;
    }

    public void setDateLastUpdate(ZonedDateTime dateLastUpdate) {
        this.dateLastUpdate = dateLastUpdate;
    }

    public String getChatUrl() {
        return chatUrl;
    }

    public void setChatUrl(String chatUrl) {
        this.chatUrl = chatUrl;
    }

    public String getEtaCompletion() {
        return etaCompletion;
    }

    public void setEtaCompletion(String etaCompletion) {
        this.etaCompletion = etaCompletion;
    }

    public Integer getEstimateHours() {
        return estimateHours;
    }

    public void setEstimateHours(Integer estimateHours) {
        this.estimateHours = estimateHours;
    }

    public String getEstimateComment() {
        return estimateComment;
    }

    public void setEstimateComment(String estimateComment) {
        this.estimateComment = estimateComment;
    }

    public Boolean isIsApproved() {
        return isApproved;
    }

    public void setIsApproved(Boolean isApproved) {
        this.isApproved = isApproved;
    }

    public Integer getTimeOnCase() {
        return timeOnCase;
    }

    public void setTimeOnCase(Integer timeOnCase) {
        this.timeOnCase = timeOnCase;
    }

    public String getEstimateLog() {
        return estimateLog;
    }

    public void setEstimateLog(String estimateLog) {
        this.estimateLog = estimateLog;
    }

    public Boolean isIsResolved() {
        return isResolved;
    }

    public void setIsResolved(Boolean isResolved) {
        this.isResolved = isResolved;
    }

    public Boolean isIsRated() {
        return isRated;
    }

    public void setIsRated(Boolean isRated) {
        this.isRated = isRated;
    }

    public ZonedDateTime getExpectedCompletionDate() {
        return expectedCompletionDate;
    }

    public void setExpectedCompletionDate(ZonedDateTime expectedCompletionDate) {
        this.expectedCompletionDate = expectedCompletionDate;
    }

    public String getExpertMessage() {
        return expertMessage;
    }

    public void setExpertMessage(String expertMessage) {
        this.expertMessage = expertMessage;
    }

    public Integer getNumberOfUpdates() {
        return numberOfUpdates;
    }

    public void setNumberOfUpdates(Integer numberOfUpdates) {
        this.numberOfUpdates = numberOfUpdates;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ExpertAccount getExpertaccount() {
        return expertaccount;
    }

    public void setExpertaccount(ExpertAccount expertAccount) {
        this.expertaccount = expertAccount;
    }

    public Technology getTechnology() {
        return technology;
    }

    public void setTechnology(Technology technology) {
        this.technology = technology;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Issue getIssue() {
        return issue;
    }

    public void setIssue(Issue issue) {
        this.issue = issue;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Supportcase supportcase = (Supportcase) o;
        if(supportcase.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, supportcase.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Supportcase{" +
            "id=" + id +
            ", summary='" + summary + "'" +
            ", expectedResult='" + expectedResult + "'" +
            ", statusMsg='" + statusMsg + "'" +
            ", dateCreated='" + dateCreated + "'" +
            ", dateLastUpdate='" + dateLastUpdate + "'" +
            ", chatUrl='" + chatUrl + "'" +
            ", etaCompletion='" + etaCompletion + "'" +
            ", estimateHours='" + estimateHours + "'" +
            ", estimateComment='" + estimateComment + "'" +
            ", isApproved='" + isApproved + "'" +
            ", timeOnCase='" + timeOnCase + "'" +
            ", estimateLog='" + estimateLog + "'" +
            ", isResolved='" + isResolved + "'" +
            ", isRated='" + isRated + "'" +
            ", expectedCompletionDate='" + expectedCompletionDate + "'" +
            ", expertMessage='" + expertMessage + "'" +
            ", numberOfUpdates='" + numberOfUpdates + "'" +
            '}';
    }
}
