package kr.co.teamb.dfsms.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.teamb.dfsms.vo.ChartVO;

@Mapper
public interface ChartDao {

	List<ChartVO> bestItemList();
	
	List<ChartVO> ctgyGroupList(Map<String, String> map);
	
}
