package eirkdbd.model;

import java.io.Serializable;

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
@Table ( name = "offer_images")
public class OfferImage implements Serializable{
	private Integer id;
	private String name;
	private String value;	
	private Offer offer;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column ( name ="id", unique = true, nullable= false )
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	@Column ( name ="name" )
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@Column ( name ="value" )
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "offer_id", nullable = false)
	public Offer getOffer() {
		return offer;
	}
	public void setOffer(Offer offer) {
		this.offer = offer;
	}

	
}
