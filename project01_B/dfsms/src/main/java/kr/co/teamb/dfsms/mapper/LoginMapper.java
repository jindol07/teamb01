package kr.co.teamb.dfsms.mapper;

import org.apache.ibatis.annotations.Mapper;

import kr.co.teamb.dfsms.vo.UserVO;

@Mapper
public interface LoginMapper {
	UserVO login(UserVO vo);
}