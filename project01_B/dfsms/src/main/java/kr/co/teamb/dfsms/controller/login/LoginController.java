package kr.co.teamb.dfsms.controller.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;

import kr.co.teamb.dfsms.service.LoginService;
import kr.co.teamb.dfsms.vo.UserVO;

@RestController
@RequestMapping("/api/member")
public class LoginController {

    @Autowired
    private LoginService loginService;


    // 로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserVO vo, HttpSession session) {
        try {
            System.out.println("==============================");
            System.out.println("로그인 요청 도착");
            System.out.println("아이디 : " + vo.getUsrid());
            System.out.println("비밀번호 : " + vo.getPwd());

            UserVO user = loginService.login(vo);

            System.out.println("LoginService 결과 : " + user);

            if (user != null) {
                System.out.println("로그인 성공");

                // 로그인 사용자 세션 저장
                session.setAttribute("loginUser", user);
                System.out.println("세션 ID : " + session.getId());
                return ResponseEntity.ok(user);
            }
            else {
                System.out.println("아이디 또는 비밀번호 불일치");
                return ResponseEntity.badRequest().body("아이디 또는 비밀번호가 올바르지 않습니다.");
            }
        }
        catch (Exception e) {
            System.out.println("로그인 중 오류 발생");
            e.printStackTrace();

            return ResponseEntity.status(500)
                    .body("로그인 실패");
        }
    }
}
