/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eproject.training.Domain.Common;

import java.io.Serializable;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Temporal;
import org.springframework.lang.Nullable;

/**
 *
 * @author THAI
 * @param <T>
 */
public abstract class BaseEntityGeneric<T extends Serializable> extends EntityGeneric<T>{
    
    @Column(name="create_by", nullable = false,updatable = false)
    private T createBy;
    
    @Column(name="create_on", nullable = false, updatable = false)
    @Temporal(javax.persistence.TemporalType.TIMESTAMP)
    private LocalDateTime createOn;
    
    @Column(name="is_delete",nullable = false)
    private Boolean isDelete;
    
    @Nullable
    @Column(name="last_modified_by", nullable = true)
    private T lastModifiedBy;
    
    @Nullable
    @Column(name="last_modified_on", nullable = true)
    @Temporal(javax.persistence.TemporalType.TIMESTAMP)
    private LocalDateTime lastModifiedOn;
    
    @Nullable
    @Column(name="delete_on", nullable = true)
    @Temporal(javax.persistence.TemporalType.TIMESTAMP)
    private LocalDateTime deleteOn;
    
    @Nullable
    @Column(name="delete_by",nullable = true)
    private T deleteBy;

    public BaseEntityGeneric() {
        createOn = LocalDateTime.now();
    }

    public T getCreateBy() {
        return createBy;
    }

    public void setCreateBy(T createBy) {
        this.createBy = createBy;
    }

    public LocalDateTime getCreateOn() {
        return createOn;
    }

    public void setCreateOn(LocalDateTime createOn) {
        this.createOn = createOn;
    }

    public Boolean getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(Boolean isDelete) {
        this.isDelete = isDelete;
    }

    public T getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(T lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public LocalDateTime getLastModifiedOn() {
        return lastModifiedOn;
    }

    public void setLastModifiedOn(LocalDateTime lastModifiedOn) {
        this.lastModifiedOn = lastModifiedOn;
    }

    public LocalDateTime getDeleteOn() {
        return deleteOn;
    }

    public void setDeleteOn(LocalDateTime deleteOn) {
        this.deleteOn = deleteOn;
    }

    public T getDeleteBy() {
        return deleteBy;
    }

    public void setDeleteBy(T deleteBy) {
        this.deleteBy = deleteBy;
    }
    
    
}
