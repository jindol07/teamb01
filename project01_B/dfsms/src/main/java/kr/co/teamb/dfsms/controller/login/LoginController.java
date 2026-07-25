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
@RequestMapping("/member")
public class LoginController {

    @Autowired
    private LoginService loginService;

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserVO vo, HttpSession session) {
        try {
            System.out.println("로그인 요청 아이디 : " + vo.getUsrid());

            UserVO user = loginService.login(vo);

            if (user != null) {
                System.out.println("로그인 성공");

                // 로그인 사용자 세션 저장
                session.setAttribute("loginUser", user);

                return ResponseEntity.ok(user);
            }
            else {
                System.out.println("아이디 또는 비밀번호 불일치");
                return ResponseEntity.badRequest()
                        .body("아이디 또는 비밀번호가 올바르지 않습니다.");
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500)
                    .body("로그인 실패");
        }
    }
}