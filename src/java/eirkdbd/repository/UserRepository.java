package eirkdbd.repository;

import org.springframework.data.repository.CrudRepository;

import eirkdbd.model.User;

public interface UserRepository extends CrudRepository<User, Integer>{

}
