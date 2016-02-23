package lt.swedforms.webServices;

import lt.swedforms.Entities.*;
import lt.swedforms.repositories.ContactUsRepository;
import lt.swedforms.repositories.RegistrationRepository;
import lt.swedforms.repositories.UserRepository;
import lt.swedforms.transferObjects.*;
import lt.swedforms.transferObjects.ContactUs;
import lt.swedforms.transferObjects.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by Super on 2/17/2016.
 */
@RestController
@SpringBootApplication
public class WebService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RegistrationRepository registrationrepository;
    @Autowired
    private ContactUsRepository contactUsRepository;

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public String authenticate(@RequestBody final User person, HttpServletRequest request) {
        if (userRepository.findByEmail(person.getEmail()).size() !=0 && userRepository.findByEmail(person.getEmail()).get(0).getPass().equals(person.getPass())) {
            lt.swedforms.Entities.User user = userRepository.findByEmail(person.getEmail()).get(0);
            String userIdentification = setRandom(user, request.getRemoteAddr());
            userRepository.save(user);
            return userIdentification;
        }
        return null;
    }

    @RequestMapping(value = "/createUser", method = RequestMethod.POST)
    public String createUser(@RequestBody final User person, HttpServletRequest request) {
        if (userRepository.findByEmail(person.getEmail()).size() == 0) {
            lt.swedforms.Entities.User user = new lt.swedforms.Entities.User(person.getEmail(), person.getPass());
            String userIdentification = setRandom(user, request.getRemoteAddr());
            userRepository.save(user);
            return userIdentification;
        } else {
            return null;
        }
    }

    @RequestMapping(value = "/signOut", method = RequestMethod.POST)
    public String signOut(@RequestBody final UserData randomNumber, HttpServletRequest request) {
        List<lt.swedforms.Entities.User> users = userRepository.findByRandom(randomNumber.getUser());
        if (users.size() != 0) {
            lt.swedforms.Entities.User user = users.get(0);
            user.setRandom("", "");
            userRepository.save(user);
            return null;
        } else {
            return null;
        }
    }

    @RequestMapping(value = "/getRegistrations", method = RequestMethod.POST)
    public List<Registration> getRegistrations(@RequestBody final UserData randomNumber, HttpServletRequest request) {
        List<lt.swedforms.Entities.User> users = userRepository.findByRandom(randomNumber.getUser());
        if (users.size() != 0 && users.get(0).getIp().equals(request.getRemoteAddr())) {
            return registrationrepository.findByEmail(users.get(0).getEmail());
        } else {
            return null;
        }
    }

    @RequestMapping(value = "/createRegistration", method = RequestMethod.POST)
    public String createRegistration(@RequestBody final NewRegistration newRegistration, HttpServletRequest request) {
        if(findUser(newRegistration.getUser(), request) != null) {
            List<Registration> existingRegistrationOnDate = registrationrepository.findByDate(
                    newRegistration.getDate()+" "+newRegistration.getTime());
            if (existingRegistrationOnDate.size() != 0) return null;
            Registration registration = new Registration(
                    findUser(newRegistration.getUser(), request),
                    newRegistration.getDate()+" "+newRegistration.getTime(),
                    newRegistration.getUnit(),
                    newRegistration.getTopic(),
                    newRegistration.getPhoneNumber(),
                    newRegistration.getComment(),
                    newRegistration.getName(),
                    newRegistration.getLastName(),
                    findUser(newRegistration.getUser(), request).getEmail());
            registrationrepository.save(registration);
            return newRegistration.getUser();
        }
        return null;
    }

    @RequestMapping(value = "/getDataForRegistration", method = RequestMethod.POST)
    public List<DateObject> getDataForRegistration(@RequestBody final UserData person, HttpServletRequest request) {
        if (findUser(person.getUser(),request) != null) {
            return getPosibleDates();
        }
        return null;
    }

    @RequestMapping(value = "/deleteRegistration", method = RequestMethod.POST)
    public String deleteRegistration(@RequestBody final RegistrationToDelete reg, HttpServletRequest request) {
        if (findUser(reg.getUser(),request) != null) {
            List<Registration> regs = registrationrepository.findByDate(reg.getDate());
            if(regs.size() != 0)
                registrationrepository.delete(regs.get(0));
            return reg.getUser();
        }
        return null;
    }

    @RequestMapping(value = "/createContactUs", method = RequestMethod.POST)
    public String createContactUs(@RequestBody final ContactUs newContacting, HttpServletRequest request) {
        if (findUser(newContacting.getUser(),request) != null) {
            lt.swedforms.Entities.ContactUs contactUs = new lt.swedforms.Entities.ContactUs(
                    newContacting.getTopic(),
                    findUser(newContacting.getUser(),request),
                    newContacting.getMessage(),
                    newContacting.getPhone(),
                    newContacting.getRadio(),
                    newContacting.getEmail(),
                    newContacting.getName(),
                    newContacting.getLastName()
                   );
            contactUsRepository.save(contactUs);
            return newContacting.getUser();
        }
        return null;
    }

    //data preparation methods

    private String setRandom(lt.swedforms.Entities.User user, String ip) {
        Random rand = new Random();
        Integer id = rand.nextInt();
        while (id < 0)
            id = rand.nextInt();
        user.setRandom(ip, id + "");
        return id + "";
    }

    private List<DateObject> getPosibleDates() {
        List<DateObject> possibleDates = new ArrayList<DateObject>();
        Date date = new Date();
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        for (int i = 0; i < 30; i++) {
            c.add(Calendar.DATE, 1);
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
            possibleDates.add(new DateObject(df.format(c.getTime())));
        }
        return getDateObjects(possibleDates, c);
    }

    private List<DateObject> getDateObjects(List<DateObject> possibleDates, Calendar c) {
        for (DateObject dateInList : possibleDates) {
            List<String> timesToDelete = new ArrayList<String>();
            for(String time: dateInList.getTimes())
            {
                List<Registration> registrations = registrationrepository.findByDate(dateInList.getDate()+" "+time);
                if(registrations.size() != 0)
                    timesToDelete.add(time);
            }
            for(String time: timesToDelete)
            {
                dateInList.removeTime(time);
            }
        }
        return possibleDates;
    }

    private Date parseDate(NewRegistration newRegistration){
        try {
            DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");
            return format.parse(newRegistration.getDate());
        } catch (ParseException ex) {
            return null;
        }
    }

    private lt.swedforms.Entities.User findUser(String userId, HttpServletRequest request)
    {
        List<lt.swedforms.Entities.User> users = userRepository.findByRandom(userId);
        if(users.size() != 0 && users.get(0).getIp().equals(request.getRemoteAddr()))
            return users.get(0);
        return null;
    }
}
