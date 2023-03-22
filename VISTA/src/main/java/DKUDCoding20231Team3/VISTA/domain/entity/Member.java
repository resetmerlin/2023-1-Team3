package DKUDCoding20231Team3.VISTA.domain.entity;


import DKUDCoding20231Team3.VISTA.domain.enumerations.Gender;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;


@Entity
@Getter
public class Member {

    @Id
    @GeneratedValue
    private Long userId;

    private String mail;

    private String password;

    private String name;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private LocalDate birth;

    private String school;

    private String region;

    // private likes

}
