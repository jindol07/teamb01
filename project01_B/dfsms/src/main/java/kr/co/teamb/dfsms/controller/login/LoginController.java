import jakarta.servlet.http.HttpSession;

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
            return ResponseEntity.badRequest().body("아이디 또는 비밀번호가 올바르지 않습니다.");
        }

    }
    catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body("로그인 실패");
    }
}
