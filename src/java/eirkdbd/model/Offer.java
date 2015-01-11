package eirkdbd.model;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="offer")
public class Offer implements Serializable{
	private Integer id;
	private String name;
	private Float price;
	private Integer hotel;
	private Integer hotelStars;
	private Set<OfferImage> images;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column (name = "item_id")
	public Integer getId() {
		return id;
	}	
	public void setId(Integer id) {
		this.id = id;
	}
	@Column (name = "name")
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@Column ( name = "price")
	public Float getPrice() {
		return price;
	}	
	public void setPrice(Float price) {
		this.price = price;
	}
	@Column ( name = "hotel" )
	public Integer getHotel() {
		return hotel;
	}
	public void setHotel(Integer hotel) {
		this.hotel = hotel;
	}
	@Column ( name = "stars")
	public Integer getHotelStars() {
		return hotelStars;
	}
	public void setHotelStars(Integer hotelStars) {
		this.hotelStars = hotelStars;
	}
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "offer")
	public Set<OfferImage> getImages() {
		return images;
	}
	public void setImages(Set<OfferImage> images) {
		this.images = images;
	}
	
	
}
