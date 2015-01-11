package eirkdbd.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import eirkdbd.model.Offer;
import eirkdbd.response.OfferResponse;
import eirkdbd.service.OfferService;

@RestController
@RequestMapping("/get/offer/")
public class OfferController {
	
	@Autowired
	private OfferService service;
	
	@RequestMapping("/{id}")
	public OfferResponse getOffer(@PathVariable("id") Integer id) {
		Offer offer = service.get(id);
		// convert offer to offer response
		return null;
	}
}
