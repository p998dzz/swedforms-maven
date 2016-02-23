package lt.swedforms.repositories;

import lt.swedforms.Entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

/**
 * Created by Super on 2/19/2016.
 */
public interface UserRepository extends MongoRepository<User, String> {
    public List<User> findByRandom(String random);
    public List<User> findByEmail(String email);
    @Query(value = "{email: ?0, password : ?1}")
    public List<User> findByEmailAndPassword(String email, String pass);
}
