package DKUDCoding20231Team3.VISTA.service;

import DKUDCoding20231Team3.VISTA.domain.entity.Member;
import DKUDCoding20231Team3.VISTA.domain.repository.MemberRepository;
import DKUDCoding20231Team3.VISTA.dto.request.MemberRequest;
import DKUDCoding20231Team3.VISTA.dto.response.MemberResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberResponse create(MemberRequest memberRequest) {
        final Member member = Member.of(memberRequest);
        memberRepository.save(member);

        return MemberResponse.of(member);
    }

    public MemberResponse read(Long memberId) {
        return MemberResponse.of(memberRepository.findById(memberId).orElseThrow());
    }

    public MemberResponse update(Long memberId, MemberRequest memberRequest) {
        Member member = memberRepository.findById(memberId).orElseThrow();
        member.updateMember(memberRequest);
        memberRepository.save(member);

        return MemberResponse.of(member);
    }

    public HttpStatus delete(Long memberId) {
        memberRepository.deleteById(memberId);

        return HttpStatus.NO_CONTENT;
    }

}
