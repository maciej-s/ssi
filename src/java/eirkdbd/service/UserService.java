package eirkdbd.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import eirkdbd.model.User;
import eirkdbd.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    protected UserRepository repository;

    @Transactional
    public User get(Integer userId) {
        return repository.findOne(userId);
    }

    @Transactional
    public Iterable<User> getAll() {
        return repository.findAll();
    }
    
    @Transactional
    public void set(User user) {
        repository.save(user);
    }

    @Transactional
    public void remove(Integer userId) {
        repository.delete(userId);
    }
    
}
