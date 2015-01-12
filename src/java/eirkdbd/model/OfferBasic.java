package eirkdbd.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "offer_basic")
public class OfferBasic {

    private Integer id;
    private Offer offer;
    private String name;
    private String value;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "item_id")
    public Integer getItemId() {
        return id;
    }

    public void setItemId(Integer itemId) {
        this.id = itemId;
    }

    @Column(name = "value")
    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "offer_id", nullable = false)
    public Offer getOfferiD() {
        return offer;
    }

    public void setOfferiD(Offer offeriD) {
        this.offer = offeriD;
    }

}
