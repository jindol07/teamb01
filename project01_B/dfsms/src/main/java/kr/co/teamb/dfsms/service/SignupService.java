package kr.co.teamb.dfsms.service;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.teamb.dfsms.mapper.SignupMapper;
import kr.co.teamb.dfsms.vo.UserVO;

@Service
public class SignupService {

	@Autowired
	private MailService mailService;

	// 인증번호 임시 저장
	private String verifyCode;

	// 회원가입 처리
	@Autowired
	private SignupMapper signupMapper;
	
	public void signup(UserVO vo) {
		signupMapper.insertUser(vo);
	}

	// 이메일 인증번호 전송
	public void sendEmailCode(String email) {

		// 6자리 인증번호 생성
		Random random = new Random();
		verifyCode = String.valueOf(100000 + random.nextInt(900000));

		System.out.println("생성된 인증번호 : " + verifyCode);
		System.out.println("전송 이메일 : " + email);

		// 메일 전송
		mailService.sendMail(email, "회원가입 인증번호", "인증번호 : " + verifyCode);
	}

	// 이메일 인증번호 확인
	public boolean verifyCode(String email, String code) {

		System.out.println("저장된 인증번호 : " + verifyCode);
		System.out.println("입력한 인증번호 : " + code);
		System.out.println("인증 이메일 : " + email);

		if (verifyCode == null) {
			System.out.println("저장된 인증번호 없음");
			return false;
		}

		if (verifyCode.equals(code)) {
			System.out.println("인증 성공");

			// 한번 사용한 인증번호 제거
			verifyCode = null;

			return true;
		}

		System.out.println("인증번호 불일치");
		return false;
	}
}
