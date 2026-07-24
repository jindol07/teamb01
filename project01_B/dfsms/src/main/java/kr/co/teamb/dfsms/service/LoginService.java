package kr.co.teamb.dfsms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.teamb.dfsms.mapper.LoginMapper;
import kr.co.teamb.dfsms.vo.UserVO;

@Service
public class LoginService {

    @Autowired
    private LoginMapper loginMapper;

    // 로그인 처리
    public UserVO login(UserVO vo) {
        return loginMapper.login(vo);
    }
}