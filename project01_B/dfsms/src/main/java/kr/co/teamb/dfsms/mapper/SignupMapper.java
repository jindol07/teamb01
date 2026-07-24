package kr.co.teamb.dfsms.mapper;

import org.apache.ibatis.annotations.Mapper;
import kr.co.teamb.dfsms.vo.UserVO;

@Mapper
public interface SignupMapper {
    int insertUser(UserVO vo);
    UserVO login(UserVO vo);
    int checkId(String usrid);
}