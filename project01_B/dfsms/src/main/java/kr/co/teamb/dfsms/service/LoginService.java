package kr.co.teamb.dfsms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.teamb.dfsms.mapper.LoginMapper;
import kr.co.teamb.dfsms.vo.MemberVO;
import kr.co.teamb.dfsms.vo.UserVO;

@Service
public class LoginService {

    @Autowired
    private LoginMapper loginMapper;

    public UserVO login(UserVO vo) {

        System.out.println("입력 아이디 : " + vo.getUsrid());
        System.out.println("입력 비밀번호 : " + vo.getPwd());

        UserVO user = loginMapper.login(vo);

        System.out.println("조회 결과 : " + user);

        if (user != null) {
            System.out.println("로그인 기록 INSERT 실행");

            loginMapper.insertLoginHistory(user);
        }
        return user;
    }
}
