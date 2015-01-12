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
@Table(name = "offer_widget")
public class OfferWidget {

    private Integer id;
    private Offer offer;
    private String name;
    private String content;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "content")
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
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
    public Offer getOfferId() {
        return offer;
    }

    public void setOfferId(Offer offerId) {
        this.offer = offerId;
    }

    @Column(name = "item_id")
    public Integer getItemId() {
        return id;
    }

    public void setItemId(Integer itemId) {
        this.id = itemId;
    }

}
