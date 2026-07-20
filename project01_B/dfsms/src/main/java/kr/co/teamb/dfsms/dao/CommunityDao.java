package kr.co.teamb.dfsms.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.teamb.dfsms.vo.CommunityVO;

@Mapper
public interface CommunityDao {
	
	void addCommunity(CommunityVO vo);
	
	//List<CommunityVO> listCommunity();
	//페이징 처리 포함
	List<CommunityVO> listCommunity(Map<String, String> map);
	int totCnt(Map<String, String> map);

	CommunityVO detailCommunity(int num);
	
	void upHit(int num);
	
	int upCommunity(CommunityVO vo);
	
	int delCommunity(int num);
}
