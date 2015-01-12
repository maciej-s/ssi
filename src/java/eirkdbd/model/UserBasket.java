package eirkdbd.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Table(name = "offer_basket")
public class UserBasket implements Serializable {

    private Integer id;
    private Float total;
    private User user;
    private Timestamp timeStamp;
    private STATUS status;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "item_id")
    public Integer getItemId() {
        return id;
    }

    public void setItemId(Integer id) {
        this.id = id;
    }

    @Column(name = "total")
    public Float getTotal() {
        return total;
    }

    public void setTotal(Float total) {
        this.total = total;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    public User getUserId() {
        return user;
    }

    public void setUserId(User userId) {
        this.user = userId;
    }

    @Column(name = "timestamp")
    public Timestamp getTimestamp() {
        return timeStamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timeStamp = timestamp;
    }

    @Column(name = "status")
    public STATUS getStatus() {
        return status;
    }

    public void setStatus(STATUS status) {
        this.status = status;
    }

}
