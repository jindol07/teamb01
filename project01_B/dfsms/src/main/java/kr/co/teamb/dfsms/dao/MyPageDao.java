package kr.co.teamb.dfsms.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.teamb.dfsms.vo.UserVO;

@Mapper
public interface MyPageDao 
{
	// ┌ 주문 내역 조회 및 페이징 처리
	List<Map<String, Object>> orderHistory(Map<String, String> map);
	// ┌ 주문 내역 전체수
	int totCnt(Map<String, String> map);
	
	// ┌ 유저 정보 변경
	int updateUserInfo(UserVO vo);
	
	UserVO selectUsrInfo(UserVO vo);
	
	int updateSubscribe(UserVO vo);
	
}
