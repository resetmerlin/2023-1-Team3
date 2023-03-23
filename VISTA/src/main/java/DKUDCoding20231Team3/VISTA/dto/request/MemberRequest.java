package DKUDCoding20231Team3.VISTA.dto.request;

import DKUDCoding20231Team3.VISTA.domain.enumerations.Gender;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;
import lombok.Getter;
import lombok.NonNull;
import java.time.LocalDate;

@Getter
@NonNull
@AllArgsConstructor
@NoArgsConstructor
public class MemberRequest {

    private String mail;

    private String password;

    private String name;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private LocalDate birth;

    private String school;

    private String region;

}
