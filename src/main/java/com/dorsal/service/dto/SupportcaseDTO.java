package com.dorsal.service.dto;

/**
 * Allowing pagination for the support case history table a DTO for data transfer is necessary
 * <p>
 * Getting the supportcase object and creating an identical DTO with two constructors
 * <p>
 * TBD: optimizing the DTO to not include everthing
 * <p>
 * Created by rogerrut on 11/16/16.
 */

import com.dorsal.domain.Supportcase;
import com.dorsal.domain.User;
import com.dorsal.domain.ExpertAccount;
import com.dorsal.domain.Technology;
import com.dorsal.domain.Status;
import com.dorsal.domain.Issue;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.time.ZonedDateTime;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;


public class SupportcaseDTO {
    private Long id;

    private String summary;

    private String expectedResult;

    private String statusMsg;

    private ZonedDateTime dateCreated;

    private ZonedDateTime dateLastUpdate;

    private String chatUrl;

    private String etaCompletion;

    private Integer estimateHours = 0;

    private String estimateComment;

    private Boolean isApproved = false;

    private Integer timeOnCase = 0;

    private String estimateLog;

    private Boolean isResolved = false;

    private Boolean isRated = false;

    private ZonedDateTime expectedCompletionDate;

    private String expertMessage;

    private Integer numberOfUpdates = 0;

    private User user;

    private ExpertAccount expertaccount;

    private Technology technology;

    private Status status;

    private Issue issue;

    /**
     * Creating consntructors that can be used for the pagination
     */
    public SupportcaseDTO() {
    }

    public SupportcaseDTO(Supportcase supportcase) {
        this(supportcase.getId(), supportcase.getSummary(), supportcase.getExpectedResult(), supportcase.getStatusMsg(),
            supportcase.getDateCreated(), supportcase.getDateLastUpdate(),supportcase.getChatUrl(),
            supportcase.getEtaCompletion(), supportcase.getEstimateHours(), supportcase.getEstimateComment(),
            supportcase.isIsApproved(), supportcase.getTimeOnCase(), supportcase.getEstimateLog(),
            supportcase.isIsResolved(), supportcase.isIsRated(), supportcase.getExpectedCompletionDate(),
            supportcase.getExpertMessage(), supportcase.getNumberOfUpdates(), supportcase.getUser(),supportcase.getExpertaccount(),
            supportcase.getTechnology(), supportcase.getStatus(),supportcase.getIssue());
    }

    public SupportcaseDTO (Long id,String summary,String expectedResult,String statusMsg,ZonedDateTime dateCreated,
                           ZonedDateTime dateLastUpdate,String chatUrl, String etaCompletion,Integer estimateHours,
                           String estimateComment, Boolean isApproved, Integer timeOnCase, String estimateLog,
                           Boolean isResolved, Boolean isRated, ZonedDateTime expectedCompletionDate,String expertMessage,
                           Integer numberOfUpdates, User user, ExpertAccount expertaccount,Technology technology,
                           Status status,Issue issue) {
        this.id = id;
        this.summary= summary;
        this.expectedResult = expectedResult;
        this.statusMsg = statusMsg;
        this.dateCreated = dateCreated;
        this.dateLastUpdate = dateLastUpdate;
        this.chatUrl = chatUrl;
        this.etaCompletion = etaCompletion;
        this.estimateHours = estimateHours;
        this.estimateComment = estimateComment;
        this.isApproved = isApproved;
        this.timeOnCase = timeOnCase;
        this.estimateLog = estimateLog;
        this.isResolved = isResolved;
        this.isRated = isRated;
        this.expectedCompletionDate = expectedCompletionDate;
        this.expertMessage = expertMessage;
        this.numberOfUpdates = numberOfUpdates;
        this.user = user;
        this.expertaccount = expertaccount;
        this.technology = technology;
        this.status = status;
        this.issue = issue;

    }


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
        if (supportcase.getId() == null || id == null) {
            return false;
        }
        return Objects.equals(id, supportcase.getId());
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
