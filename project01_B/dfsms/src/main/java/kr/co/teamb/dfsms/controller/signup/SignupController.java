package kr.co.teamb.dfsms.controller.signup;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import kr.co.teamb.dfsms.service.SignupService;
import kr.co.teamb.dfsms.vo.UserVO;

@RestController
@RequestMapping("/member")
public class SignupController {

    @Autowired
    private SignupService signupService;

    // 회원가입 + 이메일 인증번호 전송
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserVO vo) {
        try {
            System.out.println("회원가입 요청 아이디 : " + vo.getUsrid());
            System.out.println("회원가입 요청 이메일 : " + vo.getEmail());

            signupService.signup(vo);

            // 인증번호 생성 및 이메일 전송
            signupService.sendEmailCode(vo.getEmail());
            return ResponseEntity.ok("회원가입 완료");
        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500)
                    .body("회원가입 실패");
        }
    }

    // 이메일 인증번호 확인
    @PostMapping("/emailVerify")
    public ResponseEntity<?> emailVerify(@RequestBody UserVO vo) {
        try {
            System.out.println("받은 이메일 : " + vo.getEmail());
            System.out.println("받은 인증번호 : " + vo.getCode());
            boolean result = signupService.verifyCode(vo.getEmail(), vo.getCode());

            if (result) {
                System.out.println("이메일 인증 성공");
                return ResponseEntity.ok("인증 성공");
            }
            else {
                System.out.println("이메일 인증 실패");
                return ResponseEntity.badRequest().body("인증번호 불일치");
            }
        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("인증 실패");
        }
    }

    // 아이디 중복 확인
    @GetMapping("/checkId")
    public ResponseEntity<?> checkId(@RequestParam("usrid") String usrid) {
        try {
            boolean result = signupService.checkId(usrid);
            return ResponseEntity.ok(result);
        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("아이디 중복 확인 실패");
        }
    }
}