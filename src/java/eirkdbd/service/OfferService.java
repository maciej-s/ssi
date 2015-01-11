package eirkdbd.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import eirkdbd.model.Offer;
import eirkdbd.repository.OfferRepository;

@Service
public class OfferService {
	@Autowired
	protected OfferRepository repository;
	
	@Transactional
	public Offer get(Integer offerId) {
		return repository.findOne(offerId);
	}
}
