package eirkdbd.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;

@Entity
@Table(name = "offer_basket")
public class UserBasket implements Serializable {

    private Integer itemId;
    private Float total;
    private Integer userId;
    private Timestamp timeStamp;
    private STATUS status;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "item_id")
    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer id) {
        this.itemId = id;
    }

    @Column(name = "total")
    public Float getTotal() {
        return total;
    }

    public void setTotal(Float total) {
        this.total = total;
    }

    @Column(name = "user_id")
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    @Column(name = "stars")
    public Timestamp getTimestamp() {
        return timeStamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timeStamp = timestamp;
    }

    public STATUS getStatus() {
        return status;
    }

    public void setStatus(STATUS status) {
        this.status = status;
    }

}
